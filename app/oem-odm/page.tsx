import type { Metadata } from 'next'
import { InnerPageHero } from '@/components/inner-page-hero'
import { OemProcessSection } from '@/components/home/oem-process-section'
import { QualityControlSection } from '@/components/home/quality-control-section'
import { SiteShell } from '@/components/site-shell'

export const metadata: Metadata = { title: 'OEM/ODM Costume Development', description: 'A clear B2B development path from inquiry and sample review through bulk production and shipment preparation.' }

export default function OemOdmPage() {
  return <SiteShell><InnerPageHero eyebrow="OEM / ODM" title="Turn a design reference into a production-ready garment" description="We align product type, sizing, material direction and quantity before developing a sample for review." image="/images/banner-2.jpg" /><OemProcessSection /><QualityControlSection /></SiteShell>
}
