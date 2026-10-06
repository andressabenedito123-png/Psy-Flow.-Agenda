-- ==============================================================================
-- PSIFLOW - Hardening #1
--  * Impede vincular consulta a paciente de OUTRO tenant (FK não valida tenant)
--  * Fixa search_path em funções SECURITY DEFINER (evita search_path hijacking)
--  * Registro de consentimento LGPD feito pela aplicação (não presumido)
-- ==============================================================================

-- 1. Consultas só podem referenciar pacientes do próprio psicólogo
DROP POLICY IF EXISTS "Users can insert own appointments" ON public.appointments;
CREATE POLICY "Users can insert own appointments" ON public.appointments
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.patients p
            WHERE p.id = patient_id AND p.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update own appointments" ON public.appointments;
CREATE POLICY "Users can update own appointments" ON public.appointments
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.patients p
            WHERE p.id = patient_id AND p.user_id = auth.uid()
        )
    );

-- 2. Defesa extra no banco (vale também para service_role)
CREATE OR REPLACE FUNCTION public.enforce_appointment_tenant()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.patients p
        WHERE p.id = NEW.patient_id AND p.user_id = NEW.user_id
    ) THEN
        RAISE EXCEPTION 'Paciente não pertence a este profissional.';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_appointment_tenant ON public.appointments;
CREATE TRIGGER enforce_appointment_tenant
    BEFORE INSERT OR UPDATE OF patient_id, user_id ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.enforce_appointment_tenant();

-- 3. Consentimento: não presumir aceite. A aplicação grava após o checkbox.
ALTER TABLE public.users ALTER COLUMN privacy_policy_accepted SET DEFAULT false;
ALTER TABLE public.users ALTER COLUMN accepted_terms_at DROP NOT NULL;
ALTER TABLE public.users ALTER COLUMN accepted_terms_at DROP DEFAULT;

-- 4. Funções SECURITY DEFINER com search_path fixo
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = now();

    INSERT INTO public.subscriptions (user_id, status, tier, trial_ends_at)
    VALUES (NEW.id, 'trialing', 'trial', now() + interval '7 days')
    ON CONFLICT (user_id) DO NOTHING;

    INSERT INTO public.bot_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    current_uid UUID := auth.uid();
BEGIN
    IF current_uid IS NULL THEN
        RAISE EXCEPTION 'Não autenticado.';
    END IF;
    -- CASCADE remove users, patients, appointments, bot_settings, subscriptions e audit_logs
    DELETE FROM auth.users WHERE id = current_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- 5. Mensagens padrão do bot (UTF-8)
ALTER TABLE public.bot_settings ALTER COLUMN welcome_message SET DEFAULT 'Olá! Sou a secretária virtual do consultório. Como posso te ajudar com seus agendamentos hoje?';
ALTER TABLE public.bot_settings ALTER COLUMN confirmation_message SET DEFAULT 'Sua consulta foi confirmada para {{data}} às {{horario}}.';
ALTER TABLE public.bot_settings ALTER COLUMN cancellation_message SET DEFAULT 'Sua consulta foi cancelada com sucesso.';
ALTER TABLE public.bot_settings ALTER COLUMN fallback_message SET DEFAULT 'Não consegui compreender sua solicitação. O profissional entrará em contato em breve.';
