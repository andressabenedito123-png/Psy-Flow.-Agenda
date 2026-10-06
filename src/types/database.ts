export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          is_paid: boolean
          patient_id: string
          payment_method: string | null
          price: number
          reminder_24h_sent: boolean
          reminder_2h_sent: boolean
          starts_at: string
          status: Database["public"]["Enums"]["appointment_status"]
          updated_at: string
          user_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          is_paid?: boolean
          patient_id: string
          payment_method?: string | null
          price?: number
          reminder_24h_sent?: boolean
          reminder_2h_sent?: boolean
          starts_at: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
          user_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          is_paid?: boolean
          patient_id?: string
          payment_method?: string | null
          price?: number
          reminder_24h_sent?: boolean
          reminder_2h_sent?: boolean
          starts_at?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
          user_id?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity: string
          entity_id: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity?: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_settings: {
        Row: {
          business_hours: Json
          cancellation_message: string
          confirmation_message: string
          created_at: string
          fallback_message: string
          id: string
          is_active: boolean
          reminder_hours_before: number[]
          session_duration_minutes: number
          session_price: number
          updated_at: string
          user_id: string
          welcome_message: string
          whatsapp_api_token: string | null
          whatsapp_api_url: string | null
          whatsapp_instance_name: string | null
        }
        Insert: {
          business_hours?: Json
          cancellation_message?: string
          confirmation_message?: string
          created_at?: string
          fallback_message?: string
          id?: string
          is_active?: boolean
          reminder_hours_before?: number[]
          session_duration_minutes?: number
          session_price?: number
          updated_at?: string
          user_id: string
          welcome_message?: string
          whatsapp_api_token?: string | null
          whatsapp_api_url?: string | null
          whatsapp_instance_name?: string | null
        }
        Update: {
          business_hours?: Json
          cancellation_message?: string
          confirmation_message?: string
          created_at?: string
          fallback_message?: string
          id?: string
          is_active?: boolean
          reminder_hours_before?: number[]
          session_duration_minutes?: number
          session_price?: number
          updated_at?: string
          user_id?: string
          welcome_message?: string
          whatsapp_api_token?: string | null
          whatsapp_api_url?: string | null
          whatsapp_instance_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          administrative_notes: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_anonymized: boolean
          phone: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          administrative_notes?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_anonymized?: boolean
          phone: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          administrative_notes?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_anonymized?: boolean
          phone?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          accepted_terms_at: string | null
          avatar_url: string | null
          consent_ip: string | null
          created_at: string
          crp: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          privacy_policy_accepted: boolean
          terms_version: string
          updated_at: string
        }
        Insert: {
          accepted_terms_at?: string | null
          avatar_url?: string | null
          consent_ip?: string | null
          created_at?: string
          crp?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          privacy_policy_accepted?: boolean
          terms_version?: string
          updated_at?: string
        }
        Update: {
          accepted_terms_at?: string | null
          avatar_url?: string | null
          consent_ip?: string | null
          created_at?: string
          crp?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          privacy_policy_accepted?: boolean
          terms_version?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user_account: { Args: never; Returns: undefined }
    }
    Enums: {
      appointment_status:
        | "scheduled"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no_show"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "incomplete"
      subscription_tier: "trial" | "pro_monthly" | "pro_yearly" | "clinic"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: [
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
        "no_show",
      ],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "incomplete",
      ],
      subscription_tier: ["trial", "pro_monthly", "pro_yearly", "clinic"],
    },
  },
} as const
