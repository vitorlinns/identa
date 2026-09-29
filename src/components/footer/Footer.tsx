import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="mx-auto w-[min(100%-2rem,72rem)] py-6">
      <small>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</small>
    </footer>
  )
}
