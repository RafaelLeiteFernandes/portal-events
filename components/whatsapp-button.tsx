"use client"

import { Phone } from "lucide-react"
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"


export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/47997492858"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.2,
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contato via WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </motion.a>
  )
}
