import { Store, Clapperboard, PawPrint, PackageOpen } from 'lucide-react'
import { applications } from '@/lib/site-data'
import { MotionReveal } from '@/components/motion/motion-reveal'

const icons = [Store, Clapperboard, PawPrint, PackageOpen]

export function ApplicationsSection() {
  return (
    <section data-motion-section="applications" aria-labelledby="applications-heading" className="fabric-texture bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="max-w-2xl" direction="left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">Who we work with</p>
          <h2 id="applications-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Built for wholesale buyers
          </h2>
        </MotionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((app, i) => {
            const Icon = icons[i]
            return (
              <MotionReveal key={app.title} className="flex h-full flex-col gap-3 rounded-sm border border-border bg-card p-6" delay={i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="font-serif text-base text-foreground">{app.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
