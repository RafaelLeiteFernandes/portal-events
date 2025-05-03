"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { motion, useInView, useAnimation } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import EventCard from "@/components/event-card"
import EventModal from "@/components/event-modal"
import { getEventsByCategory } from "@/lib/firestore"
import type { Event } from "@/types"
import WhatsAppButton from "@/components/whatsapp-button"
import { useScrollReveal } from "@/lib/scroll-reveal"

export default function CategoryPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const categoryNames: Record<string, string> = {
    casamentos: "Casamentos",
    "15-anos": "Festas de 15 Anos",
    aniversarios: "Aniversários",
    corporativos: "Eventos Corporativos",
  }

  // Use the scroll reveal hook
  useScrollReveal()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventsData = await getEventsByCategory(slug)
        setEvents(eventsData)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchEvents()
    }
  }, [slug])

  const openModal = (event: Event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <div ref={sectionRef} className="container mx-auto px-4 py-24 max-w-6xl">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-4xl md:text-5xl font-playfair text-center mb-12 text-grafite"
        >
          <span className="text-dourado">{categoryNames[slug] || "Eventos"}</span>
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-dourado"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        ) : events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event, index) => (
              <motion.div key={event.id} custom={index} variants={cardVariants}>
                <EventCard event={event} onClick={() => openModal(event)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate={controls}
            className="text-center text-grafite text-lg"
          >
            Nenhum evento encontrado nesta categoria.
          </motion.p>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
      {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
    </div>
  )
}
