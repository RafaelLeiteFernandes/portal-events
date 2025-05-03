"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import type { Event } from "@/types"

interface EventModalProps {
  event: Event
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Handle escape key press
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)

    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.3 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  }

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  }

  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        key="modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative max-w-4xl w-full max-h-[90vh] bg-white overflow-hidden overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200 z-10"
            aria-label="Fechar"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-6 w-6 text-white" />
          </motion.button>

          {event.images.length > 0 && (
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full h-[40vh]"
            >
              <Image
                src={event.images[0] || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          )}

          <motion.div variants={contentVariants} initial="hidden" animate="visible" className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-grafite mb-6">{event.title}</h2>

            <p className="text-grafite/80 mb-8 whitespace-pre-line leading-relaxed">{event.description}</p>

            {event.images.length > 1 && (
              <motion.div variants={galleryVariants} initial="hidden" animate="visible">
                <h3 className="text-xl font-playfair font-medium text-grafite mb-6">Galeria</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      variants={galleryItemVariants}
                      className="relative aspect-square overflow-hidden img-zoom-container"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${event.title} - Imagem ${index + 2}`}
                        fill
                        className="object-cover img-zoom"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
