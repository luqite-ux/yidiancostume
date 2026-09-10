'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '@/lib/types'
import { getLocalized } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const name = getLocalized(product.name)
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0.88, y: 18 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
    <Link href={`/products/${product.slug}`} className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <div className="relative aspect-square w-full bg-[#fbfaf6] p-6">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.oemOdmAvailable && (
          <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            OEM/ODM
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-border p-4">
        <h3 className="font-serif text-base leading-snug text-foreground text-balance">{name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {getLocalized(product.shortDescription)}
        </p>
      </div>
    </Link>
    </motion.div>
  )
}
