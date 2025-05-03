"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types"

interface EventCardProps {
  event: Event
  onClick: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <motion.div
      className="bg-white overflow-hidden transition-all duration-300 hover:shadow-md group shadow-soft"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative h-64 img-zoom-container">
        <Image
          src={event.images[0] || "/placeholder.svg?height=600&width=800&query=elegant event"}
          alt={event.title}
          fill
          className="object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold text-grafite mb-3">{event.title}</h3>
        <p className="text-grafite/70 mb-6 line-clamp-3">{event.description}</p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onClick}
            variant="outline"
            className="w-full border-dourado text-dourado hover:bg-dourado hover:text-white rounded-none btn-shine"
          >
            Ver detalhes
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
