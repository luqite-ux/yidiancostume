'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { primaryNav, company } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="YIDIANYUAN home"
        >
          <Image
            src="/images/logo-transparent.png"
            alt="YIDIANYUAN logo"
            width={525}
            height={180}
            className="h-auto w-[150px] object-contain sm:w-[188px] lg:w-[205px]"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-sm px-3 py-2 text-sm font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  active
                    ? 'text-primary underline underline-offset-8'
                    : 'text-foreground/80 hover:text-primary',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${company.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {company.phone}
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 rounded-sm px-2 py-3 text-base font-medium text-foreground/90 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
