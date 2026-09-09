import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Layers3, Scissors, UsersRound } from 'lucide-react'
import { InnerPageHero } from '@/components/inner-page-hero'
import { SiteShell } from '@/components/site-shell'

export const metadata: Metadata = { title: 'About Our Garment Factory', description: 'Learn about Shantou Yidianyuan Garment Industry Co., Ltd. and its three specialty apparel product lines.' }
const facts = [{ icon: Layers3, title: 'Three confirmed product lines' }, { icon: Scissors, title: 'OEM/ODM sample development' }, { icon: UsersRound, title: 'Wholesale-buyer focus' }]

export default function AboutPage() {
  return <SiteShell><InnerPageHero eyebrow="About YIDIANYUAN" title="Specialty garments made for wholesale programs" description="Shantou Yidianyuan Garment Industry Co., Ltd. produces performance costumes, porch goose outfits and pet clothes from Shantou, China." image="/images/banner-1.jpg" /><section className="bg-background py-20"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8"><div><h2 className="font-serif text-3xl">One sewing capability, three focused markets</h2><p className="mt-5 leading-relaxed text-muted-foreground">Our work spans theatrical silhouettes, seasonal decorative outfits and compact pet apparel. Buyers can start from an existing product direction or share a reference for sample development.</p><p className="mt-4 leading-relaxed text-muted-foreground">The supplied production profile records approximately 800 m², two workshops, five sewing lines and two cutting machines, with a typical 12–15 day lead time after sample confirmation depending on order scope.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:underline">Discuss your program<ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-4">{facts.map(({ icon: Icon, title }) => <div key={title} className="flex items-center gap-4 rounded-sm border border-border bg-card p-5"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"><Icon className="h-6 w-6" aria-hidden="true" /></span><h2 className="font-serif text-lg">{title}</h2></div>)}</div></div></section></SiteShell>
}
