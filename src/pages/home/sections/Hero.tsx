import { TbChartLine, TbCoin, TbStarFilled } from 'react-icons/tb'
import { FloatingIcon } from '../../../components/ui/floating-icon/FloatingIcon'
import { ArrowFillButton } from '../../../components/ui/button/ArrowFillButton'
import { HeroStats } from './HeroStats'

type HeroProps = {
  image?: {
    src: string
    alt: string
  }
}

export function Hero({ image }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-x-clip bg-[url('/images/sections/bg-hero.png')] bg-cover bg-center bg-no-repeat py-12"
    >
      <div className="mx-auto grid w-[min(100%-2rem,72rem)] items-center gap-10 py-2 sm:gap-12 sm:py-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:py-4">
        <div className="flex min-w-0 flex-col items-start gap-6 lg:gap-8">
          <h1
            id="hero-title"
            className="m-0 max-w-xl text-4xl leading-[1.08] font-medium tracking-tight text-balance text-(--color-text) sm:text-5xl xl:text-6xl"
          >
            Clareza nas contas.{' '}
            <span className="text-(--color-secondary)">Confiança para crescer.</span>
          </h1>
          <p className="m-0 max-w-lg text-base leading-relaxed text-pretty text-(--color-text) sm:text-lg">
            Uma contabilidade próxima de você, que simplifica a rotina da sua empresa
            e ajuda a transformar números em decisões mais seguras.
          </p>
          <ArrowFillButton size="md" to="/#contato" className="mt-2 w-fit max-w-full">
            Fale com a Identa
          </ArrowFillButton>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex -space-x-3" aria-hidden="true">
              {['img-01.png', 'img-02.png', 'img-03.png', 'img-04.png', 'img-05.png'].map((photo) => (
                <img
                  key={photo}
                  src={`/images/testimonials/${photo}`}
                  alt=""
                  width={48}
                  height={48}
                  className="size-10 shrink-0 rounded-full border-2 border-(--color-white) object-cover sm:size-12"
                />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-1 text-(--color-primary)" role="img" aria-label="5 estrelas">
                {Array.from({ length: 5 }, (_, index) => (
                  <TbStarFilled key={index} className="size-4 sm:size-5" aria-hidden="true" />
                ))}
              </div>
              <p className="m-0 text-sm font-medium text-(--color-text)">eles indicam e aprovam!</p>
            </div>
          </div>
        </div>

        {image && (
          <div className="relative w-[92%] justify-self-center lg:translate-x-28 lg:justify-self-end xl:translate-x-40">
            <img
              src={image.src}
              alt={image.alt}
              width={1083}
              height={1362}
              className="block h-auto w-full"
              fetchPriority="high"
            />
            <FloatingIcon icon={TbCoin} className="top-[22%] left-[4%] -rotate-12" />
            <FloatingIcon icon={TbChartLine} className="right-[8%] bottom-[24%] rotate-12" />
          </div>
        )}
      </div>
      <HeroStats />
    </section>
  )
}
