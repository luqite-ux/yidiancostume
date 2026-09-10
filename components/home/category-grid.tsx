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
              className="h-full"
            >
              <Link href={`/products?category=${category.slug}`} className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card shadow-[0_14px_40px_rgba(30,74,52,0.08)] transition-shadow hover:shadow-[0_18px_48px_rgba(30,74,52,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <div data-category-image className="relative aspect-[4/3] overflow-hidden bg-[#f2f0e8]">
                  <Image src={category.heroImage} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-contain object-center" />
                </div>
                <div data-category-content className="flex flex-1 flex-col gap-2 border-t border-border bg-card p-6 text-foreground">
                  <h3 className="font-serif text-xl">{getLocalized(category.name)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{getLocalized(category.shortDescription)}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-[#7a521b]">View products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
