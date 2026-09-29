import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="container site-footer">
      <small>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</small>
    </footer>
  )
}
