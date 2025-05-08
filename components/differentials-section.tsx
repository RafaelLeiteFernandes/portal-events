"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const differentials = [
  {
    id: 1,
    title: "Tudo em um só lugar",
    description: "Espaço, buffet, cerimonial, decoração e estrutura — comodidade total para você não se preocupar com nada.",
    images: ["/diferenciais/tudo1.jpg", "/diferenciais/tudo2.jpg", "/diferenciais/tudo3.jpg"],
  },
  {
    id: 2,
    title: "Infraestrutura Completa",
    description: "Mesas, cadeiras, toalhas, talheres, louças e taças inclusos. Você não precisa contratar à parte.",
    images: ["/diferenciais/infra1.jpg", "/diferenciais/infra2.jpg"],
  },
  {
    id: 3,
    title: "Buffet Reconhecido",
    description: "Considerado o melhor da região pelos nossos clientes. Gastronomia impecável que impressiona no sabor e na apresentação.",
    images: Array.from({ length: 15 }, (_, i) => `/diferential/buffet/buffet${i + 1}.jpg`)
  },
  {
    id: 4,
    title: "Ambientes Versáteis",
    description: "Do campo ao moderno: diversos cenários em um único local, para cerimônias ao ar livre ou eventos sofisticados.",
    images: ["/diferenciais/amb1.jpg", "/diferenciais/amb2.jpg"],
  },
  {
    id: 5,
    title: "Equipe de Cerimonial Própria",
    description: "Organização e suporte do início ao fim com profissionais experientes e atenciosos.",
    images: ["/diferenciais/cerimonial1.jpg", "/diferenciais/cerimonial2.jpg"],
  },
  {
    id: 6,
    title: "Ambiente Climatizado",
    description: "Conforto o ano todo. Nossos ambientes internos são climatizados e preparados para qualquer estação.",
    images: ["/diferenciais/clima1.jpg", "/diferenciais/clima2.jpg"],
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
          Por que escolher a <span className="text-dourado">Portal das Águas</span>?
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
