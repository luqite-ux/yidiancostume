import type { MetadataRoute } from 'next'
import { getSupabaseClient, getTenantId } from '@/lib/supabase'

export const revalidate = 60
const base = 'https://yidiancostume.com'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/products', '/oem-odm', '/manufacturing', '/about', '/faq', '/news', '/contact']
  const client = getSupabaseClient(); const tenantId = getTenantId()
  if (!client || !tenantId) return staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() }))
  const [products, articles] = await Promise.all([
    client.from('products').select('slug,updated_at').eq('tenant_id', tenantId).eq('is_active', true),
    client.from('articles').select('slug,updated_at').eq('tenant_id', tenantId).eq('is_published', true),
  ])
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...(products.data || []).map((row) => ({ url: `${base}/products/${row.slug}`, lastModified: new Date(row.updated_at) })),
    ...(articles.data || []).map((row) => ({ url: `${base}/news/${row.slug}`, lastModified: new Date(row.updated_at) })),
  ]
}
