"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CategoryCardProps {
  title: string
  description: string
  image: string
  href: string
}

export default function CategoryCard({ title, description, image, href }: CategoryCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden h-[400px]"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute inset-0 img-zoom-container">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover img-zoom" priority />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-grafite/90 via-grafite/50 to-transparent"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
        <motion.h3
          className="text-2xl font-playfair font-bold mb-3"
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-white/90 mb-6"
          initial={{ opacity: 0.9, y: 0 }}
          whileHover={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0.9, y: 0 }}
          whileHover={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <Link href={href}>
            <Button className="bg-transparent hover:bg-dourado text-white border border-white hover:border-dourado transition-all duration-300 rounded-none btn-shine">
              Ver eventos
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
