import { useEffect, useRef, useState } from 'react'
import { heroStats } from '../../../data/heroStats'

export function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const startedAt = performance.now()
      const tick = (now: number) => {
        const elapsed = Math.min((now - startedAt) / 1400, 1)
        setProgress(1 - (1 - elapsed) ** 3)
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.25 })

    observer.observe(container)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 mx-auto mt-12 w-[min(100%-2rem,72rem)] rounded-[2rem] bg-(--color-secondary) px-6 py-10 sm:px-10 lg:-mt-10 lg:py-12">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4 lg:gap-8">
        {heroStats.map(({ label, value, suffix }, index) => (
          <div key={label} className="relative flex flex-col gap-3">
            {index > 0 && (
              <span
                aria-hidden="true"
                className={`absolute top-2 bottom-2 -left-3 w-px bg-(--color-divider) lg:-left-4 ${index % 2 === 0 ? 'hidden lg:block' : ''}`}
              />
            )}
            <dt className="order-2 text-sm leading-relaxed text-(--color-white) sm:text-base">{label}</dt>
            <dd className="order-1 m-0 text-4xl font-medium tracking-tight text-(--color-primary) tabular-nums sm:text-5xl">
              <span className="sr-only">{value.toLocaleString('pt-BR')}{suffix}</span>
              <span aria-hidden="true">{Math.round(value * progress).toLocaleString('pt-BR')}{suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
