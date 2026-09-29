// Adaptado do landing-page. Referência original: https://vault.hyperiux.com
import { useEffect, useRef, useState } from 'react'
import { Link, type LinkProps } from 'react-router'

type ArrowFillButtonProps = Omit<LinkProps, 'children'> & {
  children: string
}

export function ArrowFillButton({ children, className = '', onPointerDown, onPointerUp, onPointerCancel, ...props }: ArrowFillButtonProps) {
  const [pressed, setPressed] = useState(false)
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current)
  }, [])

  const release = () => {
    if (releaseTimer.current) clearTimeout(releaseTimer.current)
    releaseTimer.current = setTimeout(() => setPressed(false), 450)
  }

  return (
    <Link
      {...props}
      className={`group relative isolate inline-flex h-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-(--color-primary) bg-(--color-primary) py-0 pl-5 pr-[calc(var(--icon-circle)+var(--icon-right)+1rem)] text-sm font-medium leading-none whitespace-nowrap text-(--color-secondary) no-underline [text-rendering:geometricPrecision] [--icon-circle:2.25rem] [--icon-right:0.3rem] [--circle-inset:calc((100%-var(--icon-circle))/2)] ${className}`}
      data-pressed={pressed}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (event.pointerType !== 'mouse') {
          if (releaseTimer.current) clearTimeout(releaseTimer.current)
          setPressed(true)
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        if (event.pointerType !== 'mouse') release()
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        release()
      }}
    >
      <span className="relative z-1 pb-px">{children}</span>
      <span className="pointer-events-none absolute z-2 inset-[var(--circle-inset)_var(--icon-right)_var(--circle-inset)_calc(100%-var(--icon-right)-var(--icon-circle))] rounded-full bg-(--color-white) transition-[inset] duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:inset-0 group-focus-visible:inset-0 group-data-[pressed=true]:inset-0" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-0 z-2 flex items-center justify-center pb-px pl-5 pr-[calc(var(--icon-circle)+var(--icon-right)+1rem)] text-(--color-secondary) [clip-path:inset(var(--circle-inset)_var(--icon-right)_var(--circle-inset)_calc(100%-var(--icon-right)-var(--icon-circle)))] transition-[clip-path] duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)] group-data-[pressed=true]:[clip-path:inset(0)]" aria-hidden="true">{children}</span>
      <span className="pointer-events-none absolute top-1/2 right-(--icon-right) z-3 size-(--icon-circle) -translate-y-1/2 overflow-hidden rounded-full bg-(--color-white) text-(--color-secondary)" aria-hidden="true">
        {[0, 1].map((index) => (
          <svg key={index} className={`absolute top-1/2 left-1/2 transition-transform duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none ${index === 0 ? "[transform:translate(-170%,-50%)_scale(0)] group-hover:[transform:translate(-50%,-50%)_scale(1)] group-focus-visible:[transform:translate(-50%,-50%)_scale(1)] group-data-[pressed=true]:[transform:translate(-50%,-50%)_scale(1)]" : "[transform:translate(-50%,-50%)_scale(1)] group-hover:[transform:translate(70%,-50%)_scale(0)] group-focus-visible:[transform:translate(70%,-50%)_scale(0)] group-data-[pressed=true]:[transform:translate(70%,-50%)_scale(0)]"}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        ))}
      </span>
    </Link>
  )
}
