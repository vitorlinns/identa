import type { IconType } from 'react-icons'

type FloatingIconProps = {
  icon: IconType
  className?: string
}

export function FloatingIcon({ icon: Icon, className = '' }: FloatingIconProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-5 ${className}`}>
      <div className="flex size-16 items-center justify-center rounded-full border border-(--color-border) bg-(--color-primary) text-(--color-secondary) shadow-[0_12px_32px_var(--color-shadow-menu)] motion-safe:animate-[float_4s_ease-in-out_infinite] sm:size-20">
        <Icon className="size-8 sm:size-10" strokeWidth={1.5} />
      </div>
    </div>
  )
}
