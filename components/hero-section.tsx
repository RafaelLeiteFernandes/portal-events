"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const scrollPosition = window.scrollY
      const parallaxElements = sectionRef.current.querySelectorAll(".parallax")

      parallaxElements.forEach((element) => {
        const speed = (element as HTMLElement).dataset.speed || "0.2"
        const yPos = scrollPosition * Number.parseFloat(speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contato")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section id="home" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/paralax.jpg"
          alt="Casamento elegante"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 parallax" data-speed="0.05"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-8 leading-tight"
          >
            Tornamos seus momentos <span className="text-gradient">inesquecíveis</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 mb-10 font-lato font-light">
            Eventos exclusivos em um cenário de sonhos
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              onClick={scrollToContact}
              className="bg-dourado hover:bg-dourado/90 text-white font-medium px-8 py-6 rounded-none btn-minimal btn-shine hover-lift"
            >
              Agende seu evento
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ opacity: [0, 1, 0], y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
