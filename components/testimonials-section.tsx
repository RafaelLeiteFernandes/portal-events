"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ana e Pedro",
    event: "Casamento",
    text: "Nosso casamento foi um sonho realizado! A equipe da Portal das Águas cuidou de cada detalhe com carinho e profissionalismo. O espaço é deslumbrante e todos os convidados ficaram encantados.",
  },
  {
    id: 2,
    name: "Família Silva",
    event: "Festa de 15 anos",
    text: "A festa de 15 anos da nossa filha foi perfeita! O ambiente elegante e o atendimento impecável fizeram toda a diferença. Recomendamos a todos que desejam um evento inesquecível.",
  },
  {
    id: 3,
    name: "Empresa XYZ",
    event: "Evento Corporativo",
    text: "Realizamos nosso evento anual na Portal das Águas e superou todas as expectativas. A infraestrutura é excelente e a equipe muito atenciosa. Certamente voltaremos para os próximos eventos.",
  },
  {
    id: 4,
    name: "Marcela e Família",
    event: "Aniversário",
    text: "Celebrar meu aniversário na Portal das Águas foi uma experiência incrível. O espaço é lindo, a comida deliciosa e o atendimento excepcional. Todos os convidados elogiaram a escolha do local.",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

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

  const titleVariants = {
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

  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  }

  return (
    <section id="depoimentos" ref={sectionRef} className="section-spacing bg-rose-50/20 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4"
          >
            <span className="text-dourado">Depoimentos</span>
          </motion.h2>
          <motion.p variants={titleVariants} className="text-lg text-grafite/80 max-w-2xl mx-auto">
            O que nossos clientes dizem sobre nós
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-8 md:p-12 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Quote className="h-12 w-12 text-dourado/30 mx-auto mb-8" />
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl text-grafite/80 italic mb-10 font-lato"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  "{testimonials[currentIndex].text}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="font-playfair text-xl font-bold text-grafite">{testimonials[currentIndex].name}</p>
                  <p className="text-dourado">{testimonials[currentIndex].event}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-dourado/10 transition-colors duration-200"
              aria-label="Depoimento anterior"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronLeft className="h-6 w-6 text-dourado" />
            </motion.button>

            <motion.button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-dourado/10 transition-colors duration-200"
              aria-label="Próximo depoimento"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronRight className="h-6 w-6 text-dourado" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
