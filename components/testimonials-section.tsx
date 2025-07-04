"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Adriana Seidel",
    event: "Casamento",
    text: "A festa do casamento foi realizada em um lugar MUITO LINDO: o Portal das Águas! Tudo ficou perfeito – o espaço, o deck, o salão, o quiosque, toda a decoração... Fiquei apaixonada pelo trabalho do local e do cerimonial. O almoço foi feito pela Solanja e equipe do Portal das Águas. Estava MARAVILHOSO. Obrigada pela dedicação!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carol Mueller",
    event: "Casamento",
    text: "Equipe maravilhosa, que cuidou de cada detalhe com tanto amor! A melhor janta que poderíamos prestigiar hoje... Sobras do almoço do nosso casamento, que a equipe do Esítio Portal das Águas preparou pra nós! Eles nos cuidaram com tanto amor! Lugar incrível, fornecedores que não mediram esforços para nos surpreender em cada detalhe. No momento, faltam palavras para descrever tamanha alegria e gratidão que estamos sentindo!",
    rating: 5,
  },
  {
    id: 3,
    name: "Carlos e Camila",
    event: "Casamento",
    text: "Nosso casamento aconteceu no dia 03 de agosto de 2024, e não poderíamos ter escolhido lugar melhor do que o Sítio Portal das Águas. Desde o primeiro momento em que colocamos os pés lá, sentimos uma energia especial. A natureza exuberante ao redor, a beleza da água, o ar puro… tudo parecia conspirar para que nosso dia fosse mágico.\n\nSempre sonhei em ter um casamento ao ar livre, em meio ao verde, cercada pelas pessoas mais importantes da minha vida — e foi exatamente assim que aconteceu. A estrutura do sítio é impecável, tudo muito bem cuidado, pensado com carinho e atenção aos detalhes. Nos sentimos acolhidos, tranquilos e confiantes de que tudo sairia perfeito. E saiu. Cada cantinho do lugar contribuiu para tornar nosso casamento ainda mais inesquecível.\n\nAlém do espaço incrível, também somos imensamente gratos a toda a equipe que esteve ao nosso lado nesse dia tão especial. O cerimonial foi impecável, sempre presente e organizado, nos guiando com carinho e profissionalismo em cada etapa. A decoração estava deslumbrante (delicada, elegante e repleta de significado). E o buffet foi simplesmente maravilhoso: saboroso, bem servido e muito elogiado por todos os nossos convidados. Cada detalhe foi preparado com tanto cuidado que só temos a agradecer por tanta dedicação e entrega.\n\nRecomendo de coração o Sítio Portal das Águas. Foi mais do que um cenário lindo: foi parte da nossa história, do nosso sonho realizado. Seremos eternamente gratos por esse espaço tão especial e por todos que fizeram parte dele.",
    rating: 5,
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set())
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const constraintsRef = useRef(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevTestimonial()
    } else if (info.offset.x < -100) {
      nextTestimonial()
    }
  }

  const toggleExpanded = (testimonialId: number) => {
    setExpandedTestimonials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId)
      } else {
        newSet.add(testimonialId)
      }
      return newSet
    })
  }

  const getTruncatedText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    
    const truncated = text.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return truncated.substring(0, lastSpace) + '...'
  }

  const isExpanded = expandedTestimonials.has(testimonials[currentIndex].id)
  const currentTestimonial = testimonials[currentIndex]
  const shouldTruncate = currentTestimonial.text.length > 200
  const displayText = isExpanded ? currentTestimonial.text : getTruncatedText(currentTestimonial.text)

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

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as "reverse",
        ease: "easeInOut",
      },
    },
  }

  const dragIndicatorVariants = {
    initial: { x: 0 },
    animate: {
      x: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative"
          ref={constraintsRef}
        >
          <motion.div
            className="overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
          >
            <motion.div drag="x" dragConstraints={constraintsRef} onDragEnd={handleDragEnd} className="touch-pan-y">
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

                  <motion.div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      >
                        <Star
                          className="h-6 w-6 text-dourado"
                          fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="text-lg md:text-xl text-grafite/80 italic mb-6 font-lato text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="whitespace-pre-line">
                      "{displayText}"
                    </div>
                    
                    {shouldTruncate && (
                      <motion.button
                        onClick={() => toggleExpanded(currentTestimonial.id)}
                        className="mt-4 inline-flex items-center gap-2 text-dourado hover:text-dourado/80 transition-colors duration-200 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{isExpanded ? 'Ler menos' : 'Ler mais'}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </motion.button>
                    )}
                  </motion.div>

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
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{
                x: [0, 10, 0],
                transition: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                },
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-dourado"
              >
                <path
                  d="M6.5 12H17.5M17.5 12L12.5 7M17.5 12L12.5 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>

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

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="https://www.google.com/search?q=Portal+das+%C3%81guas+eventos+avalia%C3%A7%C3%B5es+Mafra&sca_esv=376a3409f9ec4160&sxsrf=AHTn8zopN6Cdwim1ZyLiOUJfgcWi7pK39w%3A1747489498847&ei=2pIoaMi4M9fT1sQPqbqXmQ0&ved=0ahUKEwjIjc_W0aqNAxXXqZUCHSndJdMQ4dUDCBA&uact=5&oq=Portal+das+%C3%81guas+eventos+avalia%C3%A7%C3%B5es+Mafra&gs_lp=Egxnd3Mtd2l6LXNlcnAiLFBvcnRhbCBkYXMgw4FndWFzIGV2ZW50b3MgYXZhbGlhw6fDtWVzIE1hZnJhMgUQIRigATIFECEYoAEyBRAhGKABSLkRUIwBWOEOcAF4AJABAJgB-AGgAdUHqgEFMC41LjG4AQPIAQD4AQGYAgegAvoHwgILEAAYgAQYsAMYogTCAggQABiwAxjvBZgDAIgGAZAGBZIHBTEuNS4xoAexFbIHBTAuNS4xuAfwB8IHBTAuNS4yyAcW&sclient=gws-wiz-serp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-grafite hover:text-dourado group"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span>Ver mais avaliações no Google</span>
              <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
