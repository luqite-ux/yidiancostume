import Link from 'next/link'
import { MessageSquareText, FileText } from 'lucide-react'
import { company } from '@/lib/site-data'

export function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur lg:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${company.phone.replace(/\s+/g, '')}`}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 border-r border-border text-sm font-medium text-foreground"
      >
        <MessageSquareText className="h-4 w-4" aria-hidden="true" />
        Call us
      </a>
      <Link
        href="/contact"
        className="flex min-h-14 flex-[1.4] items-center justify-center gap-2 bg-primary text-sm font-semibold text-primary-foreground"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Request a Quote
      </Link>
    </div>
  )
}
