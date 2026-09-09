/**
 * Locale-ready type definitions.
 *
 * Text fields use LocalizedText (a JSONB-shaped record keyed by locale code)
 * so that a future Supabase-backed CMS can add languages without changing
 * the shape of the data. `getLocalized` implements the required fallback
 * order: requested locale -> default locale -> first non-empty locale.
 */

export const DEFAULT_LOCALE = 'en' as const

export type LocaleCode = string

export type LocalizedText = Record<LocaleCode, string>

export function getLocalized(
  value: LocalizedText | string,
  requestedLocale: LocaleCode = DEFAULT_LOCALE,
): string {
  if (typeof value === 'string') return value
  if (value[requestedLocale]) return value[requestedLocale]
  if (value[DEFAULT_LOCALE]) return value[DEFAULT_LOCALE]
  const firstNonEmpty = Object.values(value).find((v) => v && v.trim().length > 0)
  return firstNonEmpty ?? ''
}

export type ProductCategorySlug = 'stage-costumes' | 'porch-goose-outfits' | 'pet-clothes'

export interface ProductCategory {
  slug: ProductCategorySlug
  name: LocalizedText | string
  shortDescription: LocalizedText | string
  heroImage: string
}

export interface ProductSpec {
  label: LocalizedText | string
  value: LocalizedText | string
}

export interface Product {
  slug: string
  name: LocalizedText | string
  category: ProductCategorySlug
  shortDescription: LocalizedText | string
  description: LocalizedText | string
  images: string[]
  specs: ProductSpec[]
  oemOdmAvailable: boolean
  tags?: string[]
}

export interface Article {
  slug: string
  title: LocalizedText | string
  excerpt: LocalizedText | string
  body: LocalizedText | string
  coverImage?: string
  publishedAt: string
}

export interface FaqItem {
  question: LocalizedText | string
  answer: LocalizedText | string
}

export interface SiteSetting {
  key: string
  value: LocalizedText | string
}
