"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <footer ref={sectionRef} className="bg-grafite text-white py-16 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={itemVariants}>
            <h3 className="font-playfair text-2xl font-bold text-dourado mb-6">Portal das Águas</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Tornamos seus momentos inesquecíveis com eventos exclusivos em um cenário de sonhos.
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="https://www.instagram.com/sitio.portaldasaguas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-dourado transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-playfair text-xl font-bold text-white mb-6">Navegação</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/#home" },
                { name: "Sobre", href: "/#sobre" },
                { name: "Eventos", href: "/#eventos" },
                { name: "Galeria", href: "/#galeria" },
                { name: "Depoimentos", href: "/#depoimentos" },
                { name: "Contato", href: "/#contato" },
              ].map((link, i) => (
                <motion.li key={link.name} custom={i} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-dourado transition-colors duration-300 border-gradient inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-playfair text-xl font-bold text-white mb-6">Contato</h4>
            <address className="not-italic text-white/80 space-y-3">
              <p>Rod. Municipal Estanislau Willner, Estr. Geral São Lourenço</p>
              <p>São Lourenço</p>
              <p>Mafra - SC, 89309-899</p>
              <p className="pt-3">
                <a
                  href="tel:+47 997492858"
                  className="hover:text-dourado transition-colors duration-300 border-gradient inline-block"
                >
                  +55 (47) 47 99749-2858
                </a>
              </p>
              <p>
                <a
                  href="mailto:contato@portaldasaguas.com"
                  className="hover:text-dourado transition-colors duration-300 border-gradient inline-block"
                >
                  contato@portaldasaguas.com
                </a>
              </p>
            </address>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.p variants={itemVariants} className="text-white/60 text-sm">
            &copy; {currentYear} Portal das Águas. Todos os direitos reservados.
          </motion.p>
          <motion.p variants={itemVariants} className="text-white/60 text-sm mt-4 md:mt-0">
            Desenvolvido por{" "}
            <a href="#" className="text-dourado hover:underline" target="_blank" rel="noopener noreferrer">
              Rafael Leite Fernandes
            </a>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
