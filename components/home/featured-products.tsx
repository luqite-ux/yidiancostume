import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.slice(0, 8)
  return (
    <section aria-labelledby="featured-heading" className="fabric-texture bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">
              Selected products
            </p>
            <h2 id="featured-heading" className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
              Representative pieces from our lines
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
