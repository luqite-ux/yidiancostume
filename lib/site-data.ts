import type { Article, FaqItem } from './types'

export const company = {
  legalName: 'Shantou Yidianyuan Garment Industry Co., Ltd.',
  brand: 'YIDIANYUAN',
  domain: 'yidiancostume.com',
  email: 'info@yidiancostume.com',
  phone: '+86 135 3120 2808',
  address: '5F, No. 142 Songshan Road, Longhu District, Shantou, Guangdong, China',
}

export const manufacturingFacts = [
  { label: 'Facility area', value: 'Approx. 800 m²' },
  { label: 'Workshops', value: '2 workshops' },
  { label: 'Sewing lines', value: '5 sewing lines' },
  { label: 'Cutting machines', value: '2 cutting machines' },
  { label: 'Monthly capacity', value: '80,000 – 100,000 pieces' },
  { label: 'Typical lead time', value: '12 – 15 days' },
]

export const qualityControlSteps = [
  {
    title: 'Incoming fabric check',
    description:
      'Fabric and trims are checked on arrival before being released to cutting and sewing lines.',
  },
  {
    title: 'In-process inspection',
    description:
      'Garments are inspected at points along the sewing lines while production is running.',
  },
  {
    title: 'Finished-product inspection',
    description:
      'Completed garments are inspected before packing and shipment preparation.',
  },
]

export const oemOdmSteps = [
  {
    title: 'Inquiry & requirements',
    description:
      'Share your product type, target quantity, sizing, and any reference imagery through the inquiry form.',
  },
  {
    title: 'Sample development',
    description:
      'Our team develops a sample based on your requirements for review before bulk production.',
  },
  {
    title: 'Sample confirmation',
    description:
      'Once the sample is confirmed, fabric, trims, and sizing are finalized for the production run.',
  },
  {
    title: 'Bulk production',
    description:
      'Cutting, sewing, and inspection proceed across our sewing lines within the agreed lead time.',
  },
  {
    title: 'Packing & shipment preparation',
    description:
      'Finished goods are packed and prepared for the shipping method agreed with your team.',
  },
]

export const applications = [
  {
    title: 'Costume rental & retail companies',
    description: 'Bulk stage and performance costume programs for rental fleets and seasonal retail.',
  },
  {
    title: 'Theater & event production houses',
    description: 'Custom-developed costumes for stage productions and themed live events.',
  },
  {
    title: 'Pet apparel brands & distributors',
    description: 'Wholesale pet clothing lines sized and finished for retail distribution.',
  },
  {
    title: 'Seasonal & novelty goods importers',
    description: 'Porch goose outfits and novelty costume sets for seasonal import programs.',
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'What is your minimum order quantity (MOQ)?',
    answer:
      'MOQ varies by product and customization level. Share your target quantity through the inquiry form and our team will confirm what applies to your order.',
  },
  {
    question: 'Can you produce a custom design based on our reference?',
    answer:
      'Yes, OEM/ODM development is supported. Send your reference images, sizing, and requirements and our team will follow up on sample development.',
  },
  {
    question: 'What is your typical production lead time?',
    answer:
      'Typical production lead time is 12–15 days after sample confirmation, depending on order quantity and complexity.',
  },
  {
    question: 'Do you inspect products before shipment?',
    answer:
      'Yes. Our process includes incoming fabric checks, in-process inspection during sewing, and a finished-product inspection before packing.',
  },
  {
    question: 'Can we request fabric or color changes?',
    answer:
      'Fabric and color options can be discussed during the sample development stage. Include your preferences in your inquiry.',
  },
  {
    question: 'How do we get a quote?',
    answer:
      'Submit the Request a Quote form with your product interest, quantity, and requirements, and our team will respond with next steps.',
  },
]

// First release ships with no published articles. This is an intentional,
// honest empty state rather than placeholder or invented press content.
export const articles: Article[] = []

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'OEM/ODM', href: '/oem-odm' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]
