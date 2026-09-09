'use client'

import Image from 'next/image'
import { useState } from 'react'

type ProductGalleryProps = {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const availableImages = images.filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = availableImages[activeIndex] || availableImages[0]

  if (!activeImage) return null

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-[#fbfaf6] p-5 sm:p-8">
        <Image
          src={activeImage}
          alt={`${productName} — image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-5 sm:p-8"
        />
      </div>

      {availableImages.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5" aria-label={`${productName} gallery`}>
          {availableImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${availableImages.length}`}
              aria-pressed={activeIndex === index}
              className={`relative aspect-square overflow-hidden rounded-sm border bg-[#fbfaf6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeIndex === index ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/60'}`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 640px) 10vw, 22vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
