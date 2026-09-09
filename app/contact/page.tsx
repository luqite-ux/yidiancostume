import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { InnerPageHero } from '@/components/inner-page-hero'
import { InquiryForm } from '@/components/inquiry-form'
import { SiteShell } from '@/components/site-shell'
import { company } from '@/lib/site-data'

export const metadata: Metadata = { title: 'Contact & Request a Quote', description: 'Send product interest, quantities and garment requirements to YIDIANYUAN for an OEM/ODM wholesale discussion.' }

export default function ContactPage() {
  return <SiteShell><InnerPageHero eyebrow="Contact" title="Tell us what you need to develop" description="Share your product line, reference, target quantity, sizing and timing. Our team will confirm the next practical step." image="/images/banner-2.jpg" /><section className="bg-background py-20"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><aside><h2 className="font-serif text-3xl">Contact details</h2><ul className="mt-8 space-y-5 text-sm text-muted-foreground"><li className="flex gap-3"><Mail className="h-5 w-5 text-primary" aria-hidden="true" /><a href={`mailto:${company.email}`} className="hover:text-primary">{company.email}</a></li><li className="flex gap-3"><Phone className="h-5 w-5 text-primary" aria-hidden="true" /><a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="hover:text-primary">{company.phone}</a></li><li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span>{company.address}</span></li></ul></aside><div className="rounded-sm border border-border bg-card p-6 sm:p-8"><h2 className="font-serif text-2xl">Request a Quote</h2><p className="mt-2 text-sm text-muted-foreground">Required fields help us route the inquiry correctly.</p><InquiryForm className="mt-8" /></div></div></section></SiteShell>
}
