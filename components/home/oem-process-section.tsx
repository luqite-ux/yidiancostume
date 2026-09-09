import Link from 'next/link'
import { MessageSquare, Scissors, CheckCircle2, Factory, PackageCheck, ArrowRight } from 'lucide-react'
import { oemOdmSteps } from '@/lib/site-data'
import { Button } from '@/components/ui/button'

const icons = [MessageSquare, Scissors, CheckCircle2, Factory, PackageCheck]

export function OemProcessSection() {
  return (
    <section aria-labelledby="oem-heading" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">OEM / ODM</p>
          <h2 id="oem-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            A defined path from inquiry to shipment
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {oemOdmSteps.map((step, i) => {
            const Icon = icons[i]
            return (
              <li key={step.title} className="relative flex flex-col gap-3 border-t-2 border-primary pt-5">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="font-serif text-lg text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            )
          })}
        </ol>

        <Button asChild className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/oem-odm">
            Learn about OEM/ODM development <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
