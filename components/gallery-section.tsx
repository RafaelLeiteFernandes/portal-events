"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Image from "next/image"
import GalleryModal from "./gallery-modal"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?key=mr6vg",
    alt: "Recepção de casamento elegante",
  },
  {
    id: 2,
    src: "/placeholder.svg?key=xebu8",
    alt: "Cerimônia ao ar livre",
  },
  {
    id: 3,
    src: "/elegant-quinceanera.png",
    alt: "Festa de 15 anos",
  },
  {
    id: 4,
    src: "/placeholder.svg?key=h1zzj",
    alt: "Evento corporativo",
  },
  {
    id: 5,
    src: "/placeholder.svg?key=b9q8n",
    alt: "Bolo de casamento",
  },
  {
    id: 6,
    src: "/placeholder.svg?key=k9i6t",
    alt: "Festa de aniversário",
  },
  {
    id: 7,
    src: "/placeholder.svg?key=cwhut",
    alt: "Mesa de recepção",
  },
  {
    id: 8,
    src: "/placeholder.svg?key=ijuu3",
    alt: "Espaço ao ar livre à noite",
  },
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const openModal = (id: number) => {
    setSelectedImage(id)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const getSelectedImage = () => {
    return galleryImages.find((img) => img.id === selectedImage)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section id="galeria" ref={sectionRef} className="section-spacing bg-off-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4"
          >
            Nossa <span className="text-dourado">Galeria</span>
          </motion.h2>
          <motion.p variants={titleVariants} className="text-lg text-grafite/80 max-w-2xl mx-auto">
            Momentos inesquecíveis capturados em nosso espaço
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              custom={index}
              variants={imageVariants}
              className="relative aspect-square overflow-hidden cursor-pointer group shadow-soft"
              onClick={() => openModal(image.id)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-grafite/0 group-hover:bg-grafite/30 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-playfair text-lg">
                  Ver
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImage !== null && <GalleryModal image={getSelectedImage()!} onClose={closeModal} />}
    </section>
  )
}
