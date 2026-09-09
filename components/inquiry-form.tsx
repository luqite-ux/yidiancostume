'use client'

import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

interface InquiryPayload { name: string; company: string; email: string; phone: string; productInterest: string; quantity: string; message: string }
interface InquiryResult { success: boolean; fieldErrors?: Partial<Record<keyof InquiryPayload, string>>; formError?: string }

const initialValues: InquiryPayload = {
  name: '',
  company: '',
  email: '',
  phone: '',
  productInterest: '',
  quantity: '',
  message: '',
}

export function InquiryForm({
  defaultProductInterest,
  className,
}: {
  defaultProductInterest?: string
  className?: string
}) {
  const formId = useId()
  const [values, setValues] = useState<InquiryPayload>({
    ...initialValues,
    productInterest: defaultProductInterest ?? '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<InquiryResult | null>(null)
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)

  function update<K extends keyof InquiryPayload>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const fields = new FormData(e.currentTarget)
    const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...values, captchaScope: fields.get('captchaScope'), captchaToken: fields.get('captchaToken'), captchaAnswer: fields.get('captchaAnswer') }) })
    const body = await response.json().catch(() => ({})) as { error?: string }
    const res: InquiryResult = response.ok ? { success: true } : { success: false, formError: body.error || 'Submission failed. Please try again.' }
    setCaptchaRefreshKey((key) => key + 1)
    setResult(res)
    if (res.success) {
      setStatus('success')
      setValues(initialValues)
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`flex flex-col items-center gap-3 rounded-sm border border-primary/20 bg-secondary px-6 py-10 text-center ${className ?? ''}`}
      >
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
        <h3 className="font-serif text-xl text-foreground">Inquiry sent</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out to YIDIANYUAN. Our team will review your request and respond
          to the email address you provided.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setStatus('idle')}>
          Send another inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate aria-describedby={`${formId}-form-error`}>
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(result?.fieldErrors?.name)}>
            <FieldLabel htmlFor={`${formId}-name`}>Full name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-name`}
                required
                autoComplete="name"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={Boolean(result?.fieldErrors?.name)}
              />
            </InputGroup>
            {result?.fieldErrors?.name && <FieldError>{result.fieldErrors.name}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(result?.fieldErrors?.company)}>
            <FieldLabel htmlFor={`${formId}-company`}>Company</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-company`}
                required
                autoComplete="organization"
                value={values.company}
                onChange={(e) => update('company', e.target.value)}
                aria-invalid={Boolean(result?.fieldErrors?.company)}
              />
            </InputGroup>
            {result?.fieldErrors?.company && <FieldError>{result.fieldErrors.company}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(result?.fieldErrors?.email)}>
            <FieldLabel htmlFor={`${formId}-email`}>Email</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-email`}
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(result?.fieldErrors?.email)}
              />
            </InputGroup>
            {result?.fieldErrors?.email && <FieldError>{result.fieldErrors.email}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(result?.fieldErrors?.phone)}>
            <FieldLabel htmlFor={`${formId}-phone`}>Phone</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-phone`}
                required
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => update('phone', e.target.value)}
                aria-invalid={Boolean(result?.fieldErrors?.phone)}
              />
            </InputGroup>
            {result?.fieldErrors?.phone && <FieldError>{result.fieldErrors.phone}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(result?.fieldErrors?.productInterest)}>
            <FieldLabel htmlFor={`${formId}-product`}>Product interest</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-product`}
                required
                placeholder="e.g. Stage costumes, pet clothes"
                value={values.productInterest}
                onChange={(e) => update('productInterest', e.target.value)}
                aria-invalid={Boolean(result?.fieldErrors?.productInterest)}
              />
            </InputGroup>
            {result?.fieldErrors?.productInterest && (
              <FieldError>{result.fieldErrors.productInterest}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor={`${formId}-quantity`}>Quantity / requirements</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${formId}-quantity`}
                placeholder="e.g. 500 pcs, mixed sizes"
                value={values.quantity}
                onChange={(e) => update('quantity', e.target.value)}
              />
            </InputGroup>
          </Field>
        </div>

        <Field data-invalid={Boolean(result?.fieldErrors?.message)}>
          <FieldLabel htmlFor={`${formId}-message`}>Message</FieldLabel>
          <Textarea
            id={`${formId}-message`}
            required
            rows={5}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={Boolean(result?.fieldErrors?.message)}
          />
          {result?.fieldErrors?.message && <FieldError>{result.fieldErrors.message}</FieldError>}
        </Field>

        {status === 'error' && result?.formError && (
          <div
            id={`${formId}-form-error`}
            role="alert"
            className="flex items-center gap-2 rounded-sm border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {result.formError}
          </div>
        )}

        <InquiryCaptchaField refreshKey={captchaRefreshKey} />

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="min-h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Spinner className="mr-2" />
              Sending inquiry…
            </>
          ) : (
            'Send inquiry'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
