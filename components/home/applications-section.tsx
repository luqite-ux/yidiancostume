import { Store, Clapperboard, PawPrint, PackageOpen } from 'lucide-react'
import { applications } from '@/lib/site-data'

const icons = [Store, Clapperboard, PawPrint, PackageOpen]

export function ApplicationsSection() {
  return (
    <section aria-labelledby="applications-heading" className="fabric-texture bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">Who we work with</p>
          <h2 id="applications-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Built for wholesale buyers
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((app, i) => {
            const Icon = icons[i]
            return (
              <div key={app.title} className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="font-serif text-base text-foreground">{app.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
