import { getSupabaseClient, getTenantId } from '@/lib/supabase'
import type { Product, ProductCategory, ProductCategorySlug, ProductSpec } from '@/lib/types'

type I18n = Record<string, string>
type Row = { slug: string | null; name: string | null; name_en: string | null; name_i18n: I18n | null; description: string | null; description_en: string | null; description_i18n: I18n | null; category_slug: string | null; image_url: string | null; specs: unknown; extra_data: unknown; sort_order: number | null }
type CategoryRow = { slug: string | null; name: string | null; name_en: string | null; name_i18n: I18n | null; description: string | null; description_en: string | null; description_i18n: I18n | null; icon: string | null; sort_order: number | null }

function text(row: { name?: string | null; name_en?: string | null; name_i18n?: I18n | null }, locale: string) { return row.name_i18n?.[locale] || row.name_i18n?.en || row.name_en || row.name || '' }
function description(row: { description?: string | null; description_en?: string | null; description_i18n?: I18n | null }, locale: string) { return row.description_i18n?.[locale] || row.description_i18n?.en || row.description_en || row.description || '' }
function categorySlug(value: string | null): ProductCategorySlug { return value === 'pet-clothes' || value === 'porch-goose-outfits' ? value : 'stage-costumes' }
function specs(value: unknown): ProductSpec[] { return Array.isArray(value) ? value.filter((item): item is ProductSpec => Boolean(item && typeof item === 'object' && 'label' in item && 'value' in item)) : [] }
function gallery(value: unknown, main: string) { const extra = value && typeof value === 'object' ? value as { gallery?: unknown } : {}; const images = Array.isArray(extra.gallery) ? extra.gallery.filter((item): item is string => typeof item === 'string' && item.startsWith('https://')) : []; return main ? [main, ...images.filter((image) => image !== main)] : images }
function toProduct(row: Row, locale: string): Product { const name = text(row, locale); const summary = description(row, locale); const main = row.image_url || ''; return { slug: row.slug || '', name, category: categorySlug(row.category_slug), shortDescription: summary, description: summary, images: gallery(row.extra_data, main), specs: specs(row.specs), oemOdmAvailable: true } }

export async function getProducts(locale = 'en'): Promise<Product[]> {
  const client = getSupabaseClient(); const tenantId = getTenantId(); if (!client || !tenantId) return []
  const { data, error } = await client.from('products').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,category_slug,image_url,specs,extra_data,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  if (error) throw new Error(`products read failed: ${error.message}`)
  return (data as Row[]).map((row) => toProduct(row, locale))
}

export async function getCategories(locale = 'en'): Promise<ProductCategory[]> {
  const client = getSupabaseClient(); const tenantId = getTenantId(); if (!client || !tenantId) return []
  const { data, error } = await client.from('product_categories').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,icon,sort_order').eq('tenant_id', tenantId).eq('is_active', true).is('parent_id', null).order('sort_order')
  if (error) throw new Error(`categories read failed: ${error.message}`)
  return (data as CategoryRow[]).map((row) => ({ slug: categorySlug(row.slug), name: text(row, locale), shortDescription: description(row, locale), heroImage: row.icon || '' }))
}

export async function getProductBySlug(slug: string, locale = 'en'): Promise<Product | null> {
  const client = getSupabaseClient(); const tenantId = getTenantId(); if (!client || !tenantId) return null
  const { data, error } = await client.from('products').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,category_slug,image_url,specs,extra_data,sort_order').eq('tenant_id', tenantId).eq('slug', slug).eq('is_active', true).maybeSingle()
  if (error) throw new Error(`product read failed: ${error.message}`)
  return data ? toProduct(data as Row, locale) : null
}
