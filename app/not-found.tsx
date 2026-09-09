import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteShell } from '@/components/site-shell'

export default function NotFound() {
  return <SiteShell><section className="bg-background py-32 text-center"><div className="mx-auto max-w-xl px-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a521b]">404</p><h1 className="mt-4 font-serif text-5xl">This page could not be found</h1><p className="mt-5 text-muted-foreground">The address may have changed. Return home or browse the current product catalog.</p><div className="mt-8 flex justify-center gap-3"><Button asChild className="bg-primary text-primary-foreground"><Link href="/">Home</Link></Button><Button asChild variant="outline"><Link href="/products">Products</Link></Button></div></div></section></SiteShell>
}
