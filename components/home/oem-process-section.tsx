import Link from 'next/link'
import { MessageSquare, Scissors, CheckCircle2, Factory, PackageCheck, ArrowRight } from 'lucide-react'
import { oemOdmSteps } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import { MotionReveal } from '@/components/motion/motion-reveal'

const icons = [MessageSquare, Scissors, CheckCircle2, Factory, PackageCheck]

export function OemProcessSection() {
  return (
    <section data-motion-section="oem-process" aria-labelledby="oem-heading" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="max-w-2xl" direction="left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">OEM / ODM</p>
          <h2 id="oem-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            A defined path from inquiry to shipment
          </h2>
        </MotionReveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {oemOdmSteps.map((step, i) => {
            const Icon = icons[i]
            return (
              <li key={step.title} className="relative">
                <MotionReveal className="flex h-full flex-col gap-3 border-t-2 border-primary pt-5" delay={i * 0.08}>
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-serif text-lg text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </MotionReveal>
              </li>
            )
          })}
        </ol>

        <MotionReveal className="mt-10" delay={0.36}>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/oem-odm">
              Learn about OEM/ODM development <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  )
}
