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
              className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-8"
            >
              Sobre a <span className="text-dourado">Portal das Águas</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed mb-8">
              Há mais de 15 anos, a Portal das Águas se dedica a transformar sonhos em realidade. Nosso espaço exclusivo
              foi projetado para proporcionar momentos inesquecíveis em um ambiente elegante e acolhedor, onde cada
              detalhe é cuidadosamente planejado para superar suas expectativas.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-grafite/80 leading-relaxed">
              Com uma equipe experiente e apaixonada pelo que faz, garantimos que seu evento seja único e personalizado,
              refletindo sua personalidade e desejos. Seja um casamento, festa de 15 anos, aniversário ou evento
              corporativo, estamos comprometidos em criar experiências memoráveis que ficarão para sempre em seu
              coração.
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
