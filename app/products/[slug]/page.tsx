import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteShell } from '@/components/site-shell'
import { ProductGallery } from '@/components/product-gallery'
import { getProductBySlug } from '@/lib/products-db'
import { getLocalized } from '@/lib/types'

export const dynamicParams = true

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  const title = getLocalized(product.name); const description = getLocalized(product.shortDescription); const url = `https://yidiancostume.com/products/${slug}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, type: 'website', url, images: product.images[0] ? [product.images[0]] : [] }, twitter: { card: 'summary_large_image', images: product.images[0] ? [product.images[0]] : [] } }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  const name = getLocalized(product.name)
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', '@id': `https://yidiancostume.com/products/${slug}#product`, name, description: getLocalized(product.description), image: product.images, category: product.category, brand: { '@type': 'Brand', name: 'YIDIANYUAN' }, manufacturer: { '@id': 'https://yidiancostume.com/#organization' }, url: `https://yidiancostume.com/products/${slug}` }) }} />
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Back to products</Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <ProductGallery images={product.images} productName={name} />
            <div className="self-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">OEM / ODM available</p>
              <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">{name}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{getLocalized(product.description)}</p>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                {product.specs.map((spec) => <div key={getLocalized(spec.label)} className="grid grid-cols-2 gap-4 py-4 text-sm"><dt className="font-semibold text-foreground">{getLocalized(spec.label)}</dt><dd className="text-muted-foreground">{getLocalized(spec.value)}</dd></div>)}
              </dl>
              <div className="mt-7 flex items-center gap-2 text-sm text-foreground"><CheckCircle2 className="h-5 w-5 text-primary" />Sizing, color and trim can be discussed during sample development.</div>
              <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground"><Link href={`/contact?product=${encodeURIComponent(name)}`}>Request a Quote</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
