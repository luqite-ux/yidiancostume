import type { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { InnerPageHero } from '@/components/inner-page-hero'
import { SiteShell } from '@/components/site-shell'
import { faqItems } from '@/lib/site-data'
import { getLocalized } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Wholesale Buyer FAQ',
  description: 'Answers about MOQ, OEM/ODM samples, production lead times, customization, inspection and requesting a quote.',
  alternates: { canonical: '/faq' },
  openGraph: { type: 'website', url: '/faq', images: ['/images/banner-1.jpg'] },
}

export default function FaqPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: getLocalized(item.question), acceptedAnswer: { '@type': 'Answer', text: getLocalized(item.answer) } })) }
  return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><InnerPageHero eyebrow="FAQ" title="Practical answers for wholesale buyers" description="If your program needs a different material, size range or order format, send the details through our inquiry form." /><section className="bg-background py-20"><Accordion type="single" collapsible className="mx-auto max-w-4xl px-4 sm:px-6">{faqItems.map((item, index) => <AccordionItem key={index} value={`faq-${index}`}><AccordionTrigger className="font-serif text-left text-lg">{getLocalized(item.question)}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{getLocalized(item.answer)}</AccordionContent></AccordionItem>)}</Accordion></section></SiteShell>
}
