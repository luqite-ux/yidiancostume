import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
const headers = { 'cache-control': 'no-store' }
const text = (value: unknown, maximum: number) => typeof value === 'string' ? value.trim().slice(0, maximum) : ''

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!secret) return Response.json({ error: 'Verification service is temporarily unavailable.' }, { status: 503, headers })
  try {
    const captcha = await verifyCaptchaSubmission({ secret, ...createSupabaseCaptchaContextFromEnv(), scope: text(body?.captchaScope, 160), token: text(body?.captchaToken, 4096), answer: text(body?.captchaAnswer, 16) })
    if (!captcha.ok) return Response.json({ error: 'The verification code is incorrect or expired. Please try again.' }, { status: 400, headers })
  } catch {
    return Response.json({ error: 'Verification service is temporarily unavailable.' }, { status: 503, headers })
  }
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() || ''
  const inquiry = {
    tenant_id: tenantId,
    name: text(body?.name, 200),
    email: text(body?.email, 320),
    phone: text(body?.phone, 80) || null,
    company: text(body?.company, 200) || null,
    subject: text(body?.productInterest, 300) || null,
    message: [text(body?.quantity, 300) ? `Quantity / requirements: ${text(body?.quantity, 300)}` : '', text(body?.message, 10000)].filter(Boolean).join('\n\n'),
    status: 'unread',
  }
  if (!tenantId || !inquiry.name || !inquiry.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return Response.json({ error: 'Please complete all required inquiry fields.' }, { status: 400, headers })
  const { data, error } = await createAdminClient().from('inquiries').insert(inquiry).select('id').single()
  if (error || !data?.id) return Response.json({ error: 'Submission failed. Please try again.' }, { status: 503, headers })
  return Response.json({ ok: true, id: data.id }, { status: 201, headers })
}
