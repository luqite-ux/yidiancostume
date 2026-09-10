import type { Metadata } from 'next'
import { InnerPageHero } from '@/components/inner-page-hero'
import { NewsEmptyState } from '@/components/news-empty-state'
import { SiteShell } from '@/components/site-shell'
import { getPublishedArticles } from '@/lib/articles-db'

export const metadata: Metadata = {
  title: 'News',
  description: 'Company and product updates from YIDIANYUAN. No articles have been published yet.',
  alternates: { canonical: '/news' },
  openGraph: { type: 'website', url: '/news', images: ['/images/banner-1.jpg'] },
}

export const revalidate = 60

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  return <SiteShell><InnerPageHero eyebrow="News" title="Company and product updates" description="Published updates will appear here after they are reviewed and released." /><section className="bg-background py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6">{articles.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <a key={article.slug} href={`/news/${article.slug}`} className="flex h-full flex-col rounded-sm border border-border bg-card p-6"><time className="text-xs text-muted-foreground">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US') : ''}</time><h2 className="mt-3 font-serif text-2xl">{article.title}</h2><p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">{article.excerpt}</p><span className="mt-6 font-semibold text-primary">Read article</span></a>)}</div> : <NewsEmptyState />}</div></section></SiteShell>
}
