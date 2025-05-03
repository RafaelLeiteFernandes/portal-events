"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Sobre", href: "/#sobre" },
  { name: "Eventos", href: "/#eventos" },
  { name: "Galeria", href: "/#galeria" },
  { name: "Depoimentos", href: "/#depoimentos" },
  { name: "Contato", href: "/#contato" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMobile()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Handle scroll and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section
      const sections = navLinks.map((link) => link.href.replace("/#", ""))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Check if we're on the homepage
    if (window.location.pathname !== "/") {
      window.location.href = href
      return
    }

    const targetId = href.replace("/#", "")
    const element = document.getElementById(targetId)

    if (element) {
      setMobileMenuOpen(false)
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative z-10 group">
            <div className="font-playfair text-2xl font-bold text-dourado">
              Portal das Águas
              <span className="block h-0.5 w-0 group-hover:w-full bg-dourado transition-all duration-300 ease-in-out"></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("/#", "")

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`font-lato relative border-gradient ${
                      isActive ? "text-dourado" : "text-grafite hover:text-dourado"
                    } transition-colors duration-300`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-dourado"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 p-2 relative"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <Menu className={`h-6 w-6 text-grafite ${mobileMenuOpen ? "hidden" : "block"}`} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay - Separado do header para evitar problemas de posicionamento */}
      {isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex flex-col">
              {/* Overlay de fundo escuro */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-grafite/95"
              />

              {/* Botão de fechar */}
              <div className="relative z-50 container mx-auto px-4 py-4 flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Fechar menu">
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Conteúdo do menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-center items-center"
              >
                <nav className="flex flex-col items-center space-y-8">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.5,
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="font-lato text-2xl text-white hover:text-dourado transition-colors duration-300 relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-dourado group-hover:w-full transition-all duration-300 ease-in-out"></span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
