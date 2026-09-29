import { Outlet } from 'react-router'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'

export function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="container" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
