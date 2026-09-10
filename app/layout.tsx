import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'YIDIANYUAN | Stage Costumes, Porch Goose Outfits & Pet Apparel Manufacturer',
    template: '%s | YIDIANYUAN',
  },
  description:
    'YIDIANYUAN (Shantou Yidianyuan Garment Industry Co., Ltd.) is a B2B manufacturer of stage & performance costumes, porch goose outfits, and pet clothes, with OEM/ODM customization for wholesale buyers.',
  metadataBase: new URL('https://yidiancostume.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32' }],
    shortcut: [{ url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: { type: 'website', url: 'https://yidiancostume.com', siteName: 'YIDIANYUAN', title: 'YIDIANYUAN | Stage Costumes, Porch Goose Outfits & Pet Apparel Manufacturer', description: 'B2B specialty garment manufacturer with OEM/ODM sample development.', images: ['/images/banner-1.jpg'] },
  twitter: { card: 'summary_large_image', images: ['/images/banner-1.jpg'] },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e4a34',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': 'https://yidiancostume.com/#organization', name: 'Shantou Yidianyuan Garment Industry Co., Ltd.', alternateName: 'YIDIANYUAN', url: 'https://yidiancostume.com', logo: 'https://yidiancostume.com/images/logo-transparent.png', email: 'info@yidiancostume.com', telephone: '+86 135 3120 2808', address: { '@type': 'PostalAddress', streetAddress: '5F, No. 142 Songshan Road', addressLocality: 'Shantou', addressRegion: 'Guangdong', addressCountry: 'CN' } }, { '@type': 'WebSite', '@id': 'https://yidiancostume.com/#website', url: 'https://yidiancostume.com', name: 'YIDIANYUAN', publisher: { '@id': 'https://yidiancostume.com/#organization' }, inLanguage: 'en' }] }) }} />
        {children}
        {process.env.VERCEL_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
