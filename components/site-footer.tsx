import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { company, primaryNav } from '@/lib/site-data'

const productLinks = [
  { slug: 'stage-costumes', name: 'Stage & Performance Costumes' },
  { slug: 'porch-goose-outfits', name: 'Porch Goose Outfits' },
  { slug: 'pet-clothes', name: 'Pet Clothes' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const legalOwner = company.legalName.replace(/[.;:!?。；：！？\s]+$/u, '')

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Link href="/" aria-label="YIDIANYUAN home" className="inline-flex items-center gap-3 rounded-sm bg-background p-3">
            <Image
              src="/images/logo.jpg"
              alt="YIDIANYUAN logo"
              width={160}
              height={64}
              className="h-14 w-14 object-contain"
            />
            <span className="font-serif text-base tracking-[0.08em] text-primary">YIDIANYUAN</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
            B2B manufacturer of stage &amp; performance costumes, porch goose outfits, and pet
            clothes, with OEM/ODM customization for wholesale buyers.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-1">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#f2c979]">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-primary-foreground/80 hover:text-primary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-1">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#f2c979]">
            Products
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {productLinks.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#f2c979]">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{company.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="hover:text-primary-foreground">
                {company.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="hover:text-primary-foreground">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-6 text-center text-xs text-primary-foreground/70 sm:px-6 lg:px-8">
        © {year} {legalOwner}. All rights reserved.
      </div>
    </footer>
  )
}
