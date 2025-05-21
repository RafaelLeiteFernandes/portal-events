"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const differentials = [
  {
    id: 1,
    title: "Tudo em um só lugar",
    description: "Cerimônia, festa, buffet e organização em um só espaço.",
    images: ["/diferential/tudo/tudo01.jpeg", "/diferential/tudo/tudo02.jpeg", "/diferential/tudo/tudo03.jpeg","/diferential/tudo/tudo04.jpeg","/diferential/tudo/tudo05.jpeg"],
  },
  {
    id: 2,
    title: "Infraestrutura Inclusa",
    description: "Mesas, cadeiras, toalhas, taças, talheres, suportes para doces — tudo já incluso.",
    images: Array.from({ length: 7 }, (_, i) => `/diferential/infra/infra${i + 1}.jpeg`)
  },
  {
    id: 3,
    title: "Mobiliário para decoração",
    description: "Acervo próprio, com móveis charmosos e prontos para usar.",
    images: Array.from({ length: 6 }, (_, i) => `/diferential/mobi/mobi${i + 1}.jpeg`)
  },
  {
    id: 4,
    title: "Buffet premiado pelos próprios convidados",
    description: "Já fui convidada para muitos casamentos, mas foi o melhor que já experimentei” — Marta, engenheira de alimentos.",
    images: Array.from({ length: 6 }, (_, i) => `/diferential/buffet/buffet${i + 1}.jpeg`)
  },
  {
    id: 5,
    title: "Ambiente climatizado",
    description: "Conforto garantido em qualquer estação do ano.",
    images: Array.from({ length: 7 }, (_, i) => `/diferential/amb/amb${i + 1}.jpeg`)
  },
  {
    id: 6,
    title: "Equipe própria de organização e cerimonial.",
    description: "Apoio completo do planejamento à execução do evento.",
    images: ["/diferenciais/cerimonial1.jpeg", "/diferenciais/cerimonial2.jpeg"],
  },
  {
    id: 7,
    title: "Opções de realizar a sua cerimônia ao ar livre ou indoor.",
    description: "Diversidade de ambientes, da natureza ao salão moderno e sofisticado.",
    images: Array.from({ length: 9 }, (_, i) => `/diferential/ceri/ceri${i + 1}.jpeg`)
  },
]

// Componente que troca imagens com fade
function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-64 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Imagem do diferencial"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function DifferentialsSection() {
  return (
    <section className="section-spacing bg-off-white">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-12"
        >
          Por que escolher o <span className="text-dourado">Portal das Águas</span>?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white shadow-soft hover:shadow-md rounded-lg overflow-hidden"
            >
              <ImageSlider images={item.images} />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-grafite mb-3">{item.title}</h3>
                <p className="text-grafite/70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
