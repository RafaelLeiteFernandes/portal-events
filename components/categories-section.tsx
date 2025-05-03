"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import CategoryCard from "./category-card"

const categories = [
  {
    id: "casamentos",
    title: "Casamentos",
    description: "Realize o casamento dos seus sonhos em um cenário encantador.",
    image: "/elegant-wedding-ceremony.png",
  },
  {
    id: "15-anos",
    title: "15 Anos",
    description: "Comemore esta data especial com uma festa inesquecível.",
    image: "/elegant-quinceanera.png",
  },
  {
    id: "aniversarios",
    title: "Aniversários",
    description: "Celebre mais um ano de vida em grande estilo.",
    image: "/elegant-gold-birthday.png",
  },
  {
    id: "corporativos",
    title: "Corporativos",
    description: "Eventos empresariais em um ambiente sofisticado e funcional.",
    image: "/elegant-corporate-event.png",
  },
]

export default function CategoriesSection() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section id="eventos" ref={sectionRef} className="section-spacing bg-rose-50/20 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4"
          >
            Nossos <span className="text-dourado">Eventos</span>
          </motion.h2>
          <motion.p variants={titleVariants} className="text-lg text-grafite/80 max-w-2xl mx-auto">
            Criamos experiências únicas e memoráveis para todos os tipos de celebrações
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div key={category.id} custom={index} variants={cardVariants} initial="hidden" animate={controls}>
              <CategoryCard
                title={category.title}
                description={category.description}
                image={category.image}
                href={`/categoria/${category.id}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
