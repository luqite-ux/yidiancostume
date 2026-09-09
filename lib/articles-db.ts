import { getSupabaseClient, getTenantId } from '@/lib/supabase'

type I18n = Record<string, string>
type Row = { slug: string | null; title: string | null; title_en: string | null; title_i18n: I18n | null; excerpt: string | null; excerpt_en: string | null; excerpt_i18n: I18n | null; content?: string | null; content_en?: string | null; content_i18n?: I18n | null; published_at: string | null; featured_image: string | null }
export type ArticleSummary = { slug: string; title: string; excerpt: string; publishedAt: string | null; image: string | null }
export type ArticleDetail = ArticleSummary & { content: string }
const pick = (i18n: I18n | null | undefined, en: string | null | undefined, legacy: string | null | undefined, locale: string) => i18n?.[locale] || i18n?.en || en || legacy || ''

export async function getPublishedArticles(locale = 'en'): Promise<ArticleSummary[]> {
  const client = getSupabaseClient(); const tenantId = getTenantId(); if (!client || !tenantId) return []
  const { data, error } = await client.from('articles').select('slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,published_at,featured_image').eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false, nullsFirst: false })
  if (error) throw new Error(`articles read failed: ${error.message}`)
  return (data as Row[]).map((row) => ({ slug: row.slug || '', title: pick(row.title_i18n, row.title_en, row.title, locale), excerpt: pick(row.excerpt_i18n, row.excerpt_en, row.excerpt, locale), publishedAt: row.published_at, image: row.featured_image }))
}

export async function getArticleBySlug(slug: string, locale = 'en'): Promise<ArticleDetail | null> {
  const client = getSupabaseClient(); const tenantId = getTenantId(); if (!client || !tenantId) return null
  const { data, error } = await client.from('articles').select('slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,content,content_en,content_i18n,published_at,featured_image').eq('tenant_id', tenantId).eq('slug', slug).eq('is_published', true).maybeSingle()
  if (error) throw new Error(`article read failed: ${error.message}`)
  if (!data) return null
  const row = data as Row
  return { slug: row.slug || '', title: pick(row.title_i18n, row.title_en, row.title, locale), excerpt: pick(row.excerpt_i18n, row.excerpt_en, row.excerpt, locale), content: pick(row.content_i18n, row.content_en, row.content, locale), publishedAt: row.published_at, image: row.featured_image }
}
