import { Newspaper } from 'lucide-react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export function NewsEmptyState() {
  return (
    <Empty className="border border-dashed border-border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Newspaper aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No news articles yet</EmptyTitle>
        <EmptyDescription>
          We have not published any news or press updates yet. Check back later, or contact us
          directly for current information.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="/contact" className="text-sm font-semibold text-primary hover:underline">
          Contact our team
        </a>
      </EmptyContent>
    </Empty>
  )
}
