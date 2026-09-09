'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { manufacturingFacts } from '@/lib/site-data'

export function ManufacturingFactsSection() {
  const reduceMotion = useReducedMotion()
  return (
    <section aria-labelledby="manufacturing-heading" className="bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c979]">Manufacturing</p>
          <h2 id="manufacturing-heading" className="mt-3 font-serif text-3xl sm:text-4xl">
            A working factory floor, not a showroom
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            The figures below reflect the facilities our team supplied directly, presented as-is.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6">
            {manufacturingFacts.map((fact) => (
              <motion.div key={fact.label} initial={false} whileHover={reduceMotion ? undefined : { x: 6 }} transition={{ type: 'spring', stiffness: 360, damping: 26 }} className="border-l-2 border-accent pl-4">
                <dd className="font-serif text-2xl">{fact.value}</dd>
                <dt className="mt-1 text-xs uppercase tracking-wide text-primary-foreground/70">
                  {fact.label}
                </dt>
              </motion.div>
            ))}
          </dl>

          <Link
            href="/manufacturing"
            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#f2c979] hover:underline"
          >
            View manufacturing details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div initial={false} whileHover={reduceMotion ? undefined : { scale: 1.012 }} transition={{ duration: 0.3 }} className="relative h-72 overflow-hidden rounded-sm sm:h-96 lg:h-full lg:min-h-[420px]">
          <Image
            src="/images/factory-latest.png"
            alt="Sewing production floor at the Shantou Yidianyuan Garment Industry facility"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
