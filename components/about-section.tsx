"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export default function AboutSection() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [showFullHistory, setShowFullHistory] = useState(false)

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

  const timelineEvents = [
    {
      year: "1998",
      title: "O início",
      description: "Tudo começou com Solanja Gutstein, que iniciou no ramo de eventos com dedicação e talento.",
    },
    {
      year: "Anos 2000",
      title: "Expansão familiar",
      description: "Dirceu Gutstein e os filhos entraram para somar forças e expandir os sonhos.",
    },
    {
      year: "2015",
      title: "Primeiro espaço próprio",
      description: "Construímos nosso primeiro espaço próprio: um quiosque para eventos ao ar livre.",
    },
    {
      year: "2015-2020",
      title: "Evolução contínua",
      description:
        "Qualificamos nossa estrutura, elevamos o padrão dos eventos e passamos a oferecer serviços completos como decoração e cerimonial.",
    },
    {
      year: "2023",
      title: "Novo salão",
      description: "Entregamos o novo salão: moderno, climatizado, elegante — pronto para eventos inesquecíveis.",
    },
    {
      year: "Hoje",
      title: "Legado familiar",
      description:
        "Mais de 25 anos depois, seguimos como uma equipe familiar dedicada, oferecendo excelência, capricho e uma experiência única do início ao fim.",
    },
  ]

  return (
    <section id="sobre" ref={sectionRef} className="section-spacing bg-off-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Seção de introdução - ocupa toda a largura */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4 text-center"
          >
            Bem-vindo ao <span className="text-dourado2">Portal das Águas</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg bold text-dourado2 font-medium mb-8 text-center">
            "Celebre seus momentos mais especiais com beleza, estrutura e tranquilidade"
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-grafite/80 leading-relaxed text-center max-w-4xl mx-auto"
          >
            O Portal das Águas é o resultado de mais de 25 anos de dedicação da Família Gutstein à arte de celebrar.
            Após décadas realizando eventos memoráveis em diversos espaços da região, criamos um lugar próprio para
            oferecer uma experiência ainda mais completa, acolhedora e inesquecível.
          </motion.p>
        </motion.div>

        {/* Grid com Timeline à esquerda e Imagem à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline section - Nossa Jornada */}
          <motion.div variants={containerVariants} initial="hidden" animate={controls}>
            <motion.h3 variants={itemVariants} className="text-3xl font-playfair font-bold text-grafite mb-8">
              Nossa Jornada
            </motion.h3>

            <motion.div variants={itemVariants} className="border-l-2 border-dourado2 pl-6 py-2 ml-4">
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.3 + index * 0.1,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    <div className="absolute -left-10 w-4 h-4 rounded-full bg-dourado2"></div>
                    <div className="flex flex-col">
                      <span className="text-dourado2 font-bold text-lg">{event.year}</span>
                      <h4 className="font-medium text-grafite text-xl">{event.title}</h4>
                      <p className="text-grafite/80">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Imagem à direita */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            className="relative h-[400px] lg:h-[600px] overflow-hidden shadow-soft img-zoom-container rounded-lg shadow-sm sticky top-24"
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
