import type { Metadata } from 'next'
import Image from 'next/image'
import { Factory, Scissors, Shirt, Warehouse } from 'lucide-react'
import { InnerPageHero } from '@/components/inner-page-hero'
import { ManufacturingFactsSection } from '@/components/home/manufacturing-facts-section'
import { QualityControlSection } from '@/components/home/quality-control-section'
import { SiteShell } from '@/components/site-shell'

export const metadata: Metadata = {
  title: 'Garment Manufacturing',
  description: 'See YIDIANYUAN production facts, sewing lines, cutting capability, inspection checkpoints, and supplied facility photography.',
  alternates: { canonical: '/manufacturing' },
  openGraph: { type: 'website', url: '/manufacturing', images: ['/images/factory-latest-clean.png'] },
}
const capabilities = [
  { icon: Factory, title: 'Two workshops', body: 'Approximately 800 m² of supplied production space.' },
  { icon: Shirt, title: 'Five sewing lines', body: 'Multiple lines support stage, novelty and pet apparel programs.' },
  { icon: Scissors, title: 'Two cutting machines', body: 'Cutting preparation is coordinated before sewing begins.' },
  { icon: Warehouse, title: 'Shipment preparation', body: 'Finished goods are inspected, packed and prepared for the agreed method.' },
]
const facilityImages = [
  ['/images/factory-latest-clean.png', 'Supplied sewing production floor'],
  ['/images/sewing-line-clean.png', 'Supplied sewing line with garments in production'],
  ['/images/finishing-area-clean.png', 'Supplied finishing and garment preparation area'],
  ['/images/warehouse-clean.png', 'Supplied garment storage and shipment-preparation area'],
]

export default function ManufacturingPage() {
  return <SiteShell><InnerPageHero eyebrow="Manufacturing" title="A documented garment-production environment" description="The figures and photographs shown here come from the client-supplied facility materials." image="/images/factory-latest-clean.png" /><ManufacturingFactsSection /><section className="bg-background py-20"><div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">{capabilities.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-sm border border-border bg-card p-6"><Icon className="h-7 w-7 text-primary" aria-hidden="true" /><h2 className="mt-4 font-serif text-xl">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></article>)}</div><div className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">{facilityImages.map(([src, alt]) => <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary"><Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div>)}</div></section><QualityControlSection /></SiteShell>
}
