"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImage {
  id: number
  src: string
  alt: string
}

interface GalleryModalProps {
  image: GalleryImage
  onClose: () => void
}

export default function GalleryModal({ image, onClose }: GalleryModalProps) {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
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
          className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[80vh]">
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" priority />
          </div>

          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
            aria-label="Fechar"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-6 w-6 text-white" />
          </motion.button>

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-white font-medium">{image.alt}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
