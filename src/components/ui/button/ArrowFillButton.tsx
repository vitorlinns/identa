// Adaptado do landing-page. Referência original: https://vault.hyperiux.com
import { useEffect, useRef, useState } from 'react'
import { Link, type LinkProps } from 'react-router'
import { TbArrowRight } from 'react-icons/tb'

type ArrowFillButtonProps = Omit<LinkProps, 'children'> & {
  children: string
  size?: 'sm' | 'md'
}

export function ArrowFillButton({ children, size = 'sm', className = '', onPointerDown, onPointerUp, onPointerCancel, ...props }: ArrowFillButtonProps) {
  const sizeClasses = size === 'md'
    ? 'h-14 text-base [--icon-circle:2.75rem] [--icon-right:0.35rem] [--label-left:1.75rem] [--label-gap:1.25rem]'
    : 'h-11 text-sm [--icon-circle:2.25rem] [--icon-right:0.3rem] [--label-left:1.25rem] [--label-gap:1rem]'

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
      className={`group relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-(--color-primary) bg-(--color-primary) py-0 pl-(--label-left) pr-[calc(var(--icon-circle)+var(--icon-right)+var(--label-gap))] font-medium leading-none whitespace-nowrap text-(--color-secondary) no-underline [text-rendering:geometricPrecision] [--circle-inset:calc((100%-var(--icon-circle))/2)] ${sizeClasses} ${className}`}
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
      <span className="pointer-events-none absolute inset-0 z-2 flex items-center justify-center pb-px pl-(--label-left) pr-[calc(var(--icon-circle)+var(--icon-right)+var(--label-gap))] text-(--color-secondary) [clip-path:inset(var(--circle-inset)_var(--icon-right)_var(--circle-inset)_calc(100%-var(--icon-right)-var(--icon-circle)))] transition-[clip-path] duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)] group-data-[pressed=true]:[clip-path:inset(0)]" aria-hidden="true">{children}</span>
      <span className="pointer-events-none absolute top-1/2 right-(--icon-right) z-3 size-(--icon-circle) -translate-y-1/2 overflow-hidden rounded-full bg-(--color-white) text-(--color-secondary)" aria-hidden="true">
        {[0, 1].map((index) => (
          <TbArrowRight key={index} className={`absolute top-1/2 left-1/2 transition-transform duration-450 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none ${index === 0 ? "[transform:translate(-170%,-50%)_scale(0)] group-hover:[transform:translate(-50%,-50%)_scale(1)] group-focus-visible:[transform:translate(-50%,-50%)_scale(1)] group-data-[pressed=true]:[transform:translate(-50%,-50%)_scale(1)]" : "[transform:translate(-50%,-50%)_scale(1)] group-hover:[transform:translate(70%,-50%)_scale(0)] group-focus-visible:[transform:translate(70%,-50%)_scale(0)] group-data-[pressed=true]:[transform:translate(70%,-50%)_scale(0)]"}`} size={size === 'md' ? 20 : 16} strokeWidth={1.8} aria-hidden="true" />
        ))}
      </span>
    </Link>
  )
}
