"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import CategoryCard from "./category-card"

const categories = [
  {
    id: "casamentos",
    title: "Casamentos",
    description: "Realize o casamento dos seus sonhos em um cenário encantador.",
    image: "/IMG_20241017_225308_3842.png",
  },
  {
    id: "15-anos",
    title: "15 Anos",
    description: "Comemore esta data especial com uma festa inesquecível.",
    image: "/15anos.jpeg",
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
    image: "/1 (2).png",
  },
]

const companyLogos = [
  {
    id: 1,
    name: "Senac",
    logo: "/logos/senac.png",
  },
  {
    id: 2,
    name: "Werner Alimentos",
    logo: "/logos/werner.png",
  },
  {
    id: 3,
    name: "EEB Hercílio Buch",
    logo: "/logos/hb.jpg",
  },
  {
    id: 4,
    name: "Referência (escola particular)",
    logo: "/logos/referencia.png",
  },
  {
    id: 5,
    name: "JBS ",
    logo: "/logos/jbs.svg",
  },
  {
    id: 6,
    name: "Hospital São Vicente de Paulo",
    logo: "/logos/hospital.png",
  },
  {
    id: 7,
    name: "Sicoob Credinorte",
    logo: "/logos/sicoob.png",
  },
]

export default function CategoriesSection() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [showCorporativeGallery, setShowCorporativeGallery] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const handleCorporativeClick = () => {
    setShowCorporativeGallery(!showCorporativeGallery)
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
                href={category.id === "corporativos" ? "#" : `/categoria/${category.id}`}
                onClick={category.id === "corporativos" ? handleCorporativeClick : undefined}
                isCorporativo={category.id === "corporativos"}
              />
            </motion.div>
          ))}
        </div>

        {/* Galeria Corporativa */}
        {showCorporativeGallery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-16 overflow-hidden"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-grafite mb-4">
                Empresas que <span className="text-dourado">Confiaram</span> em Nós
              </h3>
              <p className="text-lg text-grafite/80 max-w-2xl mx-auto mb-6">
                Confira algumas das organizações que escolheram nossos serviços para seus eventos corporativos
              </p>
              <Button
                onClick={() => setShowCorporativeGallery(false)}
                variant="ghost"
                className="text-dourado hover:text-grafite transition-colors duration-300 font-medium"
              >
                Fechar Galeria ×
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyLogos.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center justify-center text-center border border-gray-100">
                    <div className="w-full h-24 relative mb-4 flex items-center justify-center">
                      <Image
                        src={company.logo || "/placeholder.svg"}
                        alt={`Logo ${company.name}`}
                        width={160}
                        height={96}
                        className="object-contain max-w-full max-h-full transition-all duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-grafite mb-2 group-hover:text-dourado transition-colors duration-300">
                      {company.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
