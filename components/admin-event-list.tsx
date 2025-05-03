"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { getEventsByCategory, deleteEvent } from "@/lib/firestore"
import type { Event } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import Image from "next/image"

interface AdminEventListProps {
  category: string
  demoMode?: boolean
}

export default function AdminEventList({ category, demoMode = false }: AdminEventListProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventsData = await getEventsByCategory(category)
        setEvents(eventsData)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
        toast({
          title: "Erro ao carregar eventos",
          description: "Não foi possível carregar a lista de eventos.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [category, toast])

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      setDeletingId(id)
      try {
        await deleteEvent(id)
        setEvents(events.filter((event) => event.id !== id))
        toast({
          title: "Evento excluído",
          description: "O evento foi excluído com sucesso.",
        })
      } catch (error) {
        console.error("Erro ao excluir evento:", error)
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o evento.",
          variant: "destructive",
        })
      } finally {
        setDeletingId(null)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-dourado" />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-grafite/70">Nenhum evento encontrado nesta categoria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {demoMode && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-6">
          <p className="text-amber-700 text-sm">
            <strong>Modo de demonstração:</strong> A exclusão de eventos será simulada.
          </p>
        </div>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 relative h-48 md:h-auto">
              <Image
                src={event.images[0] || "/placeholder.svg?height=400&width=300&query=event"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 md:w-3/4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-playfair font-bold text-grafite mb-2">{event.title}</h3>
                <p className="text-grafite/70 line-clamp-3 mb-4">{event.description}</p>
                <p className="text-sm text-grafite/50">
                  {event.createdAt
                    ? new Date(event.createdAt.seconds * 1000).toLocaleDateString("pt-BR")
                    : "Data não disponível"}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="flex items-center gap-2"
                >
                  {deletingId === event.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
