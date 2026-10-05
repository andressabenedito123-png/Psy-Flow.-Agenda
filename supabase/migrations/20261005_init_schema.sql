-- ==============================================================================
-- PSIFLOW - SCHEMA DEFINITION & MULTI-TENANCY RLS (LGPD COMPLIANT)
-- ==============================================================================

-- 1. Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enums Tipados
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE appointment_status AS ENUM (
            'scheduled',
            'confirmed',
            'completed',
            'cancelled',
            'no_show'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status') THEN
        CREATE TYPE subscription_status AS ENUM (
            'trialing',
            'active',
            'past_due',
            'canceled',
            'unpaid',
            'incomplete'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
        CREATE TYPE subscription_tier AS ENUM (
            'trial',
            'pro_monthly',
            'pro_yearly',
            'clinic'
        );
    END IF;
END $$;

-- 3. Tabelas

-- 3.1. Users (Psicólogos)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    crp TEXT,
    avatar_url TEXT,
    phone TEXT,
    
    -- LGPD & Consentimento
    accepted_terms_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    terms_version TEXT NOT NULL DEFAULT '1.0',
    privacy_policy_accepted BOOLEAN NOT NULL DEFAULT true,
    consent_ip TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2. Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    status subscription_status NOT NULL DEFAULT 'trialing',
    tier subscription_tier NOT NULL DEFAULT 'trial',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    trial_ends_at TIMESTAMPTZ DEFAULT (now() + interval '7 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.3. Bot Settings
CREATE TABLE IF NOT EXISTS public.bot_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    
    whatsapp_instance_name TEXT,
    whatsapp_api_url TEXT,
    whatsapp_api_token TEXT,
    is_active BOOLEAN NOT NULL DEFAULT false,
    
    business_hours JSONB NOT NULL DEFAULT '{
        "monday": {"start": "08:00", "end": "18:00", "enabled": true},
        "tuesday": {"start": "08:00", "end": "18:00", "enabled": true},
        "wednesday": {"start": "08:00", "end": "18:00", "enabled": true},
        "thursday": {"start": "08:00", "end": "18:00", "enabled": true},
        "friday": {"start": "08:00", "end": "18:00", "enabled": true},
        "saturday": {"start": "08:00", "end": "12:00", "enabled": false},
        "sunday": {"start": "00:00", "end": "00:00", "enabled": false}
    }'::jsonb,
    
    session_duration_minutes INT NOT NULL DEFAULT 50,
    session_price NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
    reminder_hours_before INT[] NOT NULL DEFAULT ARRAY[24, 2],
    
    welcome_message TEXT NOT NULL DEFAULT 'Olá! Sou a secretária virtual do consultório. Como posso te ajudar com seus agendamentos hoje?',
    confirmation_message TEXT NOT NULL DEFAULT 'Sua consulta foi confirmada para {{data}} às {{horario}}.',
    cancellation_message TEXT NOT NULL DEFAULT 'Sua consulta foi cancelada com sucesso.',
    fallback_message TEXT NOT NULL DEFAULT 'Não consegui compreender sua solicitação. O profissional entrará em contato em breve.',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.4. Patients
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    administrative_notes TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    is_anonymized BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_patient_phone_per_user UNIQUE(user_id, phone)
);

-- 3.5. Appointments
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'scheduled',
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    is_paid BOOLEAN NOT NULL DEFAULT false,
    payment_method TEXT CHECK (payment_method IN ('pix', 'credit_card', 'cash', 'transfer', 'insurance', 'pending')),
    reminder_24h_sent BOOLEAN NOT NULL DEFAULT false,
    reminder_2h_sent BOOLEAN NOT NULL DEFAULT false,
    whatsapp_message_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT check_appointment_times CHECK (ends_at > starts_at)
);

-- 3.6. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id UUID,
    ip_address TEXT,
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Índices
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_bot_settings_user_id ON public.bot_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON public.patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON public.patients(user_id, phone);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule ON public.appointments(user_id, starts_at, ends_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id, created_at DESC);

-- 5. Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.bot_settings FORCE ROW LEVEL SECURITY;
ALTER TABLE public.patients FORCE ROW LEVEL SECURITY;
ALTER TABLE public.appointments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs FORCE ROW LEVEL SECURITY;

-- 6. Políticas RLS (Drop antes de criar para idempotência)
DO $$ BEGIN
    -- Users
    DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
    CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
    CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

    -- Subscriptions
    DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
    CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

    -- Bot Settings
    DROP POLICY IF EXISTS "Users can view own bot settings" ON public.bot_settings;
    CREATE POLICY "Users can view own bot settings" ON public.bot_settings FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can update own bot settings" ON public.bot_settings;
    CREATE POLICY "Users can update own bot settings" ON public.bot_settings FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own bot settings" ON public.bot_settings;
    CREATE POLICY "Users can insert own bot settings" ON public.bot_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Patients
    DROP POLICY IF EXISTS "Users can view own patients" ON public.patients;
    CREATE POLICY "Users can view own patients" ON public.patients FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own patients" ON public.patients;
    CREATE POLICY "Users can insert own patients" ON public.patients FOR INSERT WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can update own patients" ON public.patients;
    CREATE POLICY "Users can update own patients" ON public.patients FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can delete own patients" ON public.patients;
    CREATE POLICY "Users can delete own patients" ON public.patients FOR DELETE USING (auth.uid() = user_id);

    -- Appointments
    DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;
    CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own appointments" ON public.appointments;
    CREATE POLICY "Users can insert own appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can update own appointments" ON public.appointments;
    CREATE POLICY "Users can update own appointments" ON public.appointments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can delete own appointments" ON public.appointments;
    CREATE POLICY "Users can delete own appointments" ON public.appointments FOR DELETE USING (auth.uid() = user_id);

    -- Audit Logs
    DROP POLICY IF EXISTS "Users can view own audit logs" ON public.audit_logs;
    CREATE POLICY "Users can view own audit logs" ON public.audit_logs FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own audit logs" ON public.audit_logs;
    CREATE POLICY "Users can insert own audit logs" ON public.audit_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
END $$;

-- 7. Triggers e Funções de Automação

-- 7.1. Atualização automática do updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_users ON public.users;
CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_subscriptions ON public.subscriptions;
CREATE TRIGGER set_updated_at_subscriptions BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_bot_settings ON public.bot_settings;
CREATE TRIGGER set_updated_at_bot_settings BEFORE UPDATE ON public.bot_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_patients ON public.patients;
CREATE TRIGGER set_updated_at_patients BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_appointments ON public.appointments;
CREATE TRIGGER set_updated_at_appointments BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 7.2. Trigger de Onboarding Automático no Google Login (auth.users -> public.users)
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Cria perfil público do usuário psicólogo
    INSERT INTO public.users (
        id,
        email,
        full_name,
        avatar_url,
        accepted_terms_at,
        terms_version,
        privacy_policy_accepted
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
        now(),
        '1.0',
        true
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
        updated_at = now();

    -- 2. Inicializa assinatura de Trial de 7 dias
    INSERT INTO public.subscriptions (
        user_id,
        status,
        tier,
        trial_ends_at
    ) VALUES (
        NEW.id,
        'trialing',
        'trial',
        now() + interval '7 days'
    )
    ON CONFLICT (user_id) DO NOTHING;

    -- 3. Inicializa configurações padrão da secretária virtual
    INSERT INTO public.bot_settings (
        user_id
    ) VALUES (
        NEW.id
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- 7.3. Função de Exclusão de Conta / LGPD (Right to be Forgotten)
CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS VOID AS $$
DECLARE
    current_uid UUID;
BEGIN
    current_uid := auth.uid();
    IF current_uid IS NULL THEN
        RAISE EXCEPTION 'Não autenticado.';
    END IF;

    -- Remove o usuário do auth.users (dispara CASCADE em public.users, patients, appointments, etc.)
    DELETE FROM auth.users WHERE id = current_uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
