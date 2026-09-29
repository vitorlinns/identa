import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { site } from '../../data/site'
import { ArrowFillButton } from '../ui/button/ArrowFillButton'

const links = [
  { label: 'Início', to: '/' },
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Sobre nós', to: '/#sobre-nos' },
  { label: 'Contato', to: '/#contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1))
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    if (target) target.scrollIntoView({ behavior, block: 'start' })
    else if (!location.hash) window.scrollTo({ top: 0, behavior })
  }, [location])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1151px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocus)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocus)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const navigation = (mobile = false) => (
    <>
      <nav aria-label={mobile ? 'Menu móvel' : 'Navegação principal'}>
        <ul className={mobile ? "m-0 flex list-none flex-col gap-3 p-0" : "m-0 flex list-none items-center gap-6 p-0"}>
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link className={`text-sm font-semibold text-(--color-text) no-underline transition-colors duration-200 hover:text-(--color-secondary) motion-reduce:transition-none ${mobile ? "block rounded-2xl px-4 py-3 hover:bg-(--color-surface-hover)" : ""}`} to={to} onClick={() => setOpen(false)}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <ArrowFillButton className={mobile ? "mt-5 w-full" : "w-fit"} to="/#contato" onClick={() => setOpen(false)}>
        Fale com a Identa
      </ArrowFillButton>
    </>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--color-border) bg-(--color-white)" ref={headerRef}>
      <div className="relative mx-auto flex min-h-22 max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link className="inline-flex shrink-0" to="/" aria-label={`${site.name} — início`} onClick={() => setOpen(false)}>
          <img className="block h-10 w-auto" src="/images/brand/logo.png" alt={site.name} width="2937" height="795" />
        </Link>
        <div className="hidden items-center gap-6 min-[1151px]:flex">{navigation()}</div>
        <button
          ref={toggleRef}
          className="relative z-2 inline-flex size-12 cursor-pointer items-center justify-center rounded-full border-0 bg-(--color-primary) p-0 text-(--color-secondary) shadow-[0_1px_2px_var(--color-shadow-soft)] min-[1151px]:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="header-mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" className={`text-2xl font-medium leading-none transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-45' : 'rotate-0'}`}>+</span>
        </button>
        {open && <div className="fixed inset-x-0 top-22 bottom-0 bg-(--color-overlay) min-[1151px]:hidden" aria-hidden="true" onClick={() => setOpen(false)} />}
        <div id="header-mobile-menu" className={`fixed inset-x-4 top-25 mx-auto max-h-[calc(100dvh-7rem)] max-w-88 overflow-y-auto rounded-[2rem] bg-(--color-white) p-5 shadow-[0_10px_20px_var(--color-shadow-menu)] transition-[opacity,transform,visibility] duration-300 motion-reduce:transition-none min-[1151px]:hidden ${open ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-4 opacity-0'}`} inert={!open} aria-hidden={!open}>
          {navigation(true)}
        </div>
      </div>
    </header>
  )
}
