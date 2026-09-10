'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type RevealDirection = 'up' | 'left' | 'right' | 'scale'

const revealFrom = {
  up: { opacity: 0.88, y: 24 },
  left: { opacity: 0.88, x: -22 },
  right: { opacity: 0.88, x: 22 },
  scale: { opacity: 0.9, y: 12, scale: 0.98 },
} satisfies Record<RevealDirection, Record<string, number>>

export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  amount?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      data-motion-reveal
      initial={reduceMotion ? false : revealFrom[direction]}
      animate={reduceMotion ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.58, delay: Math.min(delay, 0.42), ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
