import { site } from '../../data/site'

export function HomePage() {
  return (
    <>
      <h1>{site.name}</h1>
      <p>{site.description}</p>
      {/* Destinos provisórios da navegação; conteúdo a definir. */}
      <section id="servicos" aria-labelledby="servicos-titulo">
        <h2 id="servicos-titulo">Serviços</h2>
      </section>
      <section id="sobre-nos" aria-labelledby="sobre-titulo">
        <h2 id="sobre-titulo">Sobre nós</h2>
      </section>
      <section id="contato" aria-labelledby="contato-titulo">
        <h2 id="contato-titulo">Contato</h2>
      </section>
    </>
  )
}
