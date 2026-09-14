'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
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
  desktopCopyClassName?: string
  desktopHeadingClassName?: string
  desktopEyebrowClassName?: string
  desktopBodyClassName?: string
  eyebrow: string
  heading: string
  body: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

const slides: Slide[] = [
  {
    id: 'stage-costume-collection',
    image: '/images/banner-stage-collection.jpg',
    imagePositionMobile: '62% center',
    imagePositionDesktop: 'center center',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-start sm:justify-center sm:pb-0',
    textAlignmentDesktop: 'sm:text-left',
    desktopHeadingClassName: 'sm:text-white',
    desktopEyebrowClassName: 'sm:text-white',
    desktopBodyClassName: 'sm:text-white/80',
    eyebrow: 'Stage costume collections',
    heading: 'Distinctive looks shaped for the spotlight',
    body: 'Develop coordinated stage and performance costume programs with confirmed materials, sizing, decoration, and sampling before bulk production.',
    primaryCta: { label: 'Explore Stage Costumes', href: '/products?category=stage-costumes' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
  },
  {
    id: 'princess-and-pet-apparel',
    image: '/images/banner-princess-pet.jpg',
    imagePositionMobile: '34% center',
    imagePositionDesktop: 'center center',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-end sm:justify-center sm:pb-0',
    textAlignmentDesktop: 'sm:text-left',
    eyebrow: 'Coordinated apparel programs',
    heading: 'Princess styles developed across size and product lines',
    body: 'Bring a consistent color and decoration direction to stage costumes, children’s styles, and complementary pet apparel through OEM/ODM development.',
    primaryCta: { label: 'Explore Products', href: '/products' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
  },
  {
    id: 'porch-goose-catalog',
    image: '/images/banner-goose-catalog.jpg',
    imagePositionMobile: '47% center',
    imagePositionDesktop: 'center center',
    contentPositionMobile: 'items-start justify-end pb-28',
    contentPositionDesktop: 'sm:items-start sm:justify-center sm:pb-0',
    textAlignmentDesktop: 'sm:text-left',
    desktopCopyClassName: 'sm:rounded-2xl sm:bg-primary sm:p-8 sm:text-primary-foreground',
    desktopHeadingClassName: 'sm:text-primary-foreground',
    desktopEyebrowClassName: 'sm:text-primary-foreground',
    desktopBodyClassName: 'sm:text-primary-foreground/80',
    eyebrow: 'Porch goose outfit collections',
    heading: 'Seasonal character for every doorstep display',
    body: 'Create coordinated porch goose outfits for holiday, wedding, and occasion themes with customizable fabrics, sizing, and decorative details.',
    primaryCta: { label: 'Explore Goose Outfits', href: '/products?category=porch-goose-outfits' },
    secondaryCta: { label: 'Request a Quote', href: '/contact' },
  },
]

const AUTOPLAY_MS = 7000

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion() ?? false
  const touchStartX = useRef<number | null>(null)

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
      className="relative h-[650px] w-full overflow-hidden bg-background sm:h-[620px] lg:h-[680px]"
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
          <div className="absolute inset-x-0 top-0 h-[220px] bg-white sm:inset-0 sm:h-auto">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              className="object-contain [object-position:var(--pos-mobile)] sm:object-cover sm:[object-position:var(--pos-desktop)]"
              style={
                {
                  '--pos-mobile': slide.imagePositionMobile,
                  '--pos-desktop': slide.imagePositionDesktop,
                } as React.CSSProperties
              }
            />
          </div>
          <div className={cn('relative mx-auto flex h-full max-w-7xl flex-col items-stretch justify-start px-4 pb-24 pt-[220px] sm:px-6 sm:pt-0 lg:px-8', slide.contentPositionDesktop)}>
            <motion.div
              initial={false}
              animate={reducedMotion ? { opacity: 1, y: 0 } : i === index ? { opacity: 1, y: 0 } : { opacity: 0.9, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'w-full bg-background p-5 text-foreground sm:max-w-xl sm:bg-transparent sm:p-0',
                slide.textAlignmentDesktop,
                slide.desktopCopyClassName,
              )}
            >
              <p className={cn('text-xs font-semibold uppercase tracking-[0.2em] text-primary', slide.desktopEyebrowClassName)}>
                {slide.eyebrow}
              </p>
              <Heading className={cn('mt-3 font-serif text-2xl leading-tight text-balance sm:text-4xl lg:text-5xl', slide.desktopHeadingClassName)}>
                {slide.heading}
              </Heading>
              <p className={cn('mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base', slide.desktopBodyClassName)}>
                {slide.body}
              </p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="min-h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={slide.primaryCta.href}>{slide.primaryCta.label}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-11 border-primary bg-background/90 text-primary hover:bg-secondary"
                >
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      })}

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 sm:bottom-8">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
              className="group flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-accent' : 'w-2.5 bg-primary/55 group-hover:bg-primary/80',
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
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {paused ? <Play className="h-5 w-5" aria-hidden="true" /> : <Pause className="h-5 w-5" aria-hidden="true" />}
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
