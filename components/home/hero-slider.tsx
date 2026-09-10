'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  image: string
  imagePositionMobile: string
  imagePositionDesktop: string
  contentPositionMobile: string
  contentPositionDesktop: string
  textAlignmentDesktop: string
  eyebrow: string
  heading: string
  body: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  imageNote?: string
}

const slides: Slide[] = [
  {
    id: 'breadth',
    image: '/images/banner-1.jpg',
    imagePositionMobile: 'center 65%',
    imagePositionDesktop: 'center 55%',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-start sm:justify-start sm:pb-0 sm:pt-16',
    textAlignmentDesktop: 'sm:text-left',
    eyebrow: 'Stage costumes · Porch goose outfits · Pet clothes',
    heading: 'Three product lines, one manufacturing partner',
    body: 'YIDIANYUAN develops and produces performance costumes, seasonal porch goose outfits, and pet apparel for wholesale buyers, with OEM/ODM customization built into every program.',
    primaryCta: { label: 'Explore Products', href: '/products' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
    imageNote: 'Promotional composite showing our three product categories.',
  },
  {
    id: 'development',
    image: '/images/banner-2.jpg',
    imagePositionMobile: 'center 20%',
    imagePositionDesktop: 'center 30%',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-end sm:justify-center sm:pb-0',
    textAlignmentDesktop: 'sm:text-left',
    eyebrow: 'OEM / ODM development',
    heading: 'From reference image to confirmed sample',
    body: 'Send your design reference, sizing, and quantity, and our team develops a sample for your review before bulk production begins on our sewing lines.',
    primaryCta: { label: 'See OEM/ODM Process', href: '/oem-odm' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
    imageNote: 'Promotional imagery styled around a stage costume reference.',
  },
  {
    id: 'manufacturing',
    image: '/images/factory-latest-clean.png',
    imagePositionMobile: 'center 40%',
    imagePositionDesktop: 'center 45%',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-start sm:justify-center sm:pb-0',
    textAlignmentDesktop: 'sm:text-left',
    eyebrow: 'Manufacturing',
    heading: 'Documented production, inspected at every stage',
    body: 'Two workshops and five sewing lines run incoming fabric checks, in-process inspection, and finished-product inspection ahead of a typical 12–15 day lead time.',
    primaryCta: { label: 'View Manufacturing', href: '/manufacturing' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
    imageNote: 'Photograph of our production floor.',
  },
]

const AUTOPLAY_MS = 7000

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [index, paused, reducedMotion, goTo])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') goTo(index + 1)
    if (e.key === 'ArrowLeft') goTo(index - 1)
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  return (
    <section
      data-motion-section="hero"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative h-[560px] w-full overflow-hidden sm:h-[620px] lg:h-[680px]"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      tabIndex={0}
    >
      {slides.map((slide, i) => {
        const Heading = i === index ? 'h1' : 'h2'
        return <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          inert={i !== index}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover [object-position:var(--pos-mobile)] sm:[object-position:var(--pos-desktop)]"
            style={
              {
                '--pos-mobile': slide.imagePositionMobile,
                '--pos-desktop': slide.imagePositionDesktop,
              } as React.CSSProperties
            }
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/5 sm:bg-gradient-to-r sm:from-primary/85 sm:via-primary/30 sm:to-primary/5" />

          <div className={cn('relative mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8', slide.contentPositionMobile, slide.contentPositionDesktop)}>
            <motion.div
              initial={false}
              animate={reducedMotion ? { opacity: 1, y: 0 } : i === index ? { opacity: 1, y: 0 } : { opacity: 0.9, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className={cn('max-w-xl rounded-sm bg-primary/45 p-5 text-primary-foreground backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-none', slide.textAlignmentDesktop)}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c979]">
                {slide.eyebrow}
              </p>
              <Heading className="mt-3 font-serif text-2xl leading-tight text-balance sm:text-4xl lg:text-5xl">
                {slide.heading}
              </Heading>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
                {slide.body}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="min-h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={slide.primaryCta.href}>{slide.primaryCta.label}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-11 border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>
              {slide.imageNote && (
                <p className="mt-4 hidden text-xs text-primary-foreground/70 sm:block">{slide.imageNote}</p>
              )}
            </motion.div>
          </div>
        </div>
      })}

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 sm:bottom-8">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="group flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-accent' : 'w-2.5 bg-primary-foreground/50 group-hover:bg-primary-foreground/80',
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          aria-pressed={paused}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          {paused ? <Play className="h-5 w-5" aria-hidden="true" /> : <Pause className="h-5 w-5" aria-hidden="true" />}
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
