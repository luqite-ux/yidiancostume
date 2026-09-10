import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqItems } from '@/lib/site-data'
import { MotionReveal } from '@/components/motion/motion-reveal'

export function FaqPreviewSection() {
  const preview = faqItems.slice(0, 4)
  return (
    <section data-motion-section="faq" aria-labelledby="faq-heading" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="text-center" direction="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">FAQ</p>
          <h2 id="faq-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Common buyer questions
          </h2>
        </MotionReveal>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {preview.map((item, i) => (
            <MotionReveal key={i} delay={i * 0.08}>
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger className="font-serif text-left text-base">
                  {typeof item.question === 'string' ? item.question : item.question.en}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {typeof item.answer === 'string' ? item.answer : item.answer.en}
                </AccordionContent>
              </AccordionItem>
            </MotionReveal>
          ))}
        </Accordion>

        <MotionReveal className="mt-8 text-center" delay={0.32}>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </MotionReveal>
      </div>
    </section>
  )
}
