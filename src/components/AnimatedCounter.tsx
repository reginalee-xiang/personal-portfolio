import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2000 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    let raf: number
    const startTime = performance.now()

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutExpo(progress) * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}
