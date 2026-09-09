import { PackageSearch, Search, ClipboardCheck } from 'lucide-react'
import { qualityControlSteps } from '@/lib/site-data'

const icons = [PackageSearch, Search, ClipboardCheck]

export function QualityControlSection() {
  return (
    <section aria-labelledby="qc-heading" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">Quality control</p>
          <h2 id="qc-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Three inspection checkpoints
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {qualityControlSteps.map((step, i) => {
            const Icon = icons[i]
            return (
              <li key={step.title} className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-lg text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
