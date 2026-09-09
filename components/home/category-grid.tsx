'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { getLocalized, type ProductCategory } from '@/lib/types'

export function CategoryGrid({ categories }: { categories: ProductCategory[] }) {
  const reduceMotion = useReducedMotion()
  return (
    <section aria-labelledby="categories-heading" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">Product lines</p>
          <h2 id="categories-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Built for three distinct programs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Each category is produced on the same sewing lines, with OEM/ODM customization
            available across all three.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              initial={false}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="h-96"
            >
              <Link href={`/products?category=${category.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <Image src={category.heroImage} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                <div className="relative mt-auto flex flex-col gap-2 p-6 text-primary-foreground">
                  <h3 className="font-serif text-xl">{getLocalized(category.name)}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/85">{getLocalized(category.shortDescription)}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#f2c979]">View products <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
