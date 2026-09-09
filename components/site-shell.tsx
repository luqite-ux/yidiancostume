import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StickyMobileCta } from '@/components/sticky-mobile-cta'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-14 lg:pb-0">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <StickyMobileCta />
    </div>
  )
}
