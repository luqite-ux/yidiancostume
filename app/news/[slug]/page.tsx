import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteShell } from '@/components/site-shell'
import { getArticleBySlug } from '@/lib/articles-db'

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug)
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `https://yidiancostume.com/news/${article.slug}` }, openGraph: { type: 'article', title: article.title, description: article.excerpt, url: `https://yidiancostume.com/news/${article.slug}`, images: article.image ? [article.image] : [] } } : { title: 'Article not found' }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()
  return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', '@id': `https://yidiancostume.com/news/${article.slug}#article`, headline: article.title, description: article.excerpt, image: article.image || undefined, datePublished: article.publishedAt || undefined, dateModified: article.publishedAt || undefined, publisher: { '@id': 'https://yidiancostume.com/#organization' }, mainEntityOfPage: `https://yidiancostume.com/news/${article.slug}` }) }} /><article className="mx-auto max-w-3xl px-4 py-20 sm:px-6"><time className="text-sm text-muted-foreground">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US') : ''}</time><h1 className="mt-3 font-serif text-4xl sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg text-muted-foreground">{article.excerpt}</p><div className="article-prose mt-10" dangerouslySetInnerHTML={{ __html: article.content }} /></article></SiteShell>
}
