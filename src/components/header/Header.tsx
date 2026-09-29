import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { site } from '../../data/site'
import './Header.css'

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
        <ul className="header-links">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} onClick={() => setOpen(false)}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link className="header-cta" to="/#contato" onClick={() => setOpen(false)}>
        Fale com a Identa
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </Link>
    </>
  )

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link className="header-brand" to="/" aria-label={`${site.name} — início`} onClick={() => setOpen(false)}>
          <img src="/images/brand/logo.png" alt={site.name} width="2937" height="795" />
        </Link>
        <div className="header-desktop">{navigation()}</div>
        <button
          ref={toggleRef}
          className="header-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="header-mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" className={open ? 'is-open' : ''}>+</span>
        </button>
        {open && <div className="header-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
        <div id="header-mobile-menu" className={`header-mobile${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
          {navigation(true)}
        </div>
      </div>
    </header>
  )
}
