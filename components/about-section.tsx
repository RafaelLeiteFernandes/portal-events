"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="sobre" ref={sectionRef} className="section-spacing bg-off-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate={controls}>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4"
            >
              Bem-vindo ao <span className="text-dourado">Portal das Águas</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg bold text-dourado font-medium mb-8">
              "Celebre seus momentos mais especiais com beleza, estrutura e tranquilidade"
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed mb-6">
              O Portal das Águas é o resultado de mais de 25 anos de dedicação da Família Gutstein à arte de celebrar.
              Após décadas realizando eventos memoráveis em diversos espaços da região, criamos um lugar próprio para
              oferecer uma experiência ainda mais completa, acolhedora e inesquecível.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed mb-6">
              Nosso espaço foi pensado para transformar sonhos em realidade: áreas ao ar livre rodeadas pela natureza,
              um salão moderno e sofisticado, e uma equipe familiar que cuida de cada detalhe com carinho, eficiência e
              profissionalismo.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed mb-6">
              Aqui, você encontra tudo em um só lugar — do espaço à organização. Ajudamos você a planejar cada etapa,
              sem estresse, com soluções personalizadas e suporte integral. Para casamentos, aniversários ou eventos
              corporativos, o Portal das Águas é o cenário ideal para viver momentos únicos.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed">
              Agende uma visita e venha conhecer de perto o lugar onde grandes histórias começam.
            </motion.p>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            className="relative h-[400px] md:h-[500px] overflow-hidden shadow-soft img-zoom-container rounded-lg shadow-sm"
          >
            <Image
              src="/elegant-event-venue.jpg"
              alt="Portal das Águas - Espaço de Eventos"
              fill
              className="object-cover img-zoom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
