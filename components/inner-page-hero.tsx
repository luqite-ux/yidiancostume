import Image from 'next/image'

export function InnerPageHero({ eyebrow, title, description, image = '/images/banner-3.jpg' }: { eyebrow: string; title: string; description: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
      <Image src={image} alt="" fill priority className="-z-20 object-cover" sizes="100vw" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-primary/85" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c979]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">{description}</p>
      </div>
    </section>
  )
}
