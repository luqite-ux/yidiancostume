import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function getTenantId() { return process.env.NEXT_PUBLIC_TENANT_ID?.trim() || null }
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return url && key ? createClient(url, key) : null
}
