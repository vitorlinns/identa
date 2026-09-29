import { Outlet } from 'react-router'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'

export function SiteLayout() {
  return (
    <>
      <a className="fixed -top-20 left-4 z-100 bg-(--color-white) p-4 focus:top-4" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="mx-auto w-[min(100%-2rem,72rem)] flex-1 py-12" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
