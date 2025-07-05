import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import type { Event, EventData } from "@/types"

// Dados de demonstração para quando o Firebase não estiver configurado
const demoEvents: Record<string, Event[]> = {
  casamentos: [
    {
      id: "demo-1",
      title: "Casamento de Ana e Pedro",
      description:
        "Um lindo casamento realizado em nosso espaço principal com decoração em tons de rosa e dourado. O evento contou com cerimônia ao ar livre e recepção para 150 convidados, com serviço completo de buffet e open bar.",
      category: "casamentos",
      images: ["/placeholder.svg?key=bn7yh", "/outdoor-wedding-ceremony.png", "/placeholder.svg?key=1c8fq"],
      createdAt: new Date(),
    },
    {
      id: "demo-2",
      title: "Casamento de Juliana e Marcos",
      description:
        "Cerimônia intimista com decoração rústica e elegante. O evento foi realizado ao pôr do sol, com iluminação especial que criou um ambiente mágico para os 80 convidados.",
      category: "casamentos",
      images: ["/placeholder.svg?key=a8nt2", "/placeholder.svg?key=cfiu5", "/placeholder.svg?key=ug0ld"],
      createdAt: new Date(),
    },
  ],
  "15-anos": [
    {
      id: "demo-3",
      title: "15 Anos de Mariana",
      description:
        "Uma celebração inesquecível com tema de princesa moderna. A decoração em tons de rosa e prata encantou os 120 convidados, com apresentação de valsa e festa animada até o amanhecer.",
      category: "15-anos",
      images: [
        "/elegant-quinceanera.png",
        "/placeholder.svg?height=600&width=800&query=quinceanera party decoration",
        "/placeholder.svg?height=600&width=800&query=sweet fifteen cake with silver details",
      ],
      createdAt: new Date(),
    },
  ],
  aniversarios: [
    {
      id: "demo-4",
      title: "Aniversário de 50 anos de Roberto",
      description:
        "Celebração sofisticada com tema de whisky e charutos. O evento contou com degustação especial e ambiente exclusivo para 60 convidados.",
      category: "aniversarios",
      images: [
        "/elegant-gold-birthday.png",
        "/placeholder.svg?height=600&width=800&query=elegant birthday party for adults",
        "/placeholder.svg?height=600&width=800&query=whiskey tasting setup",
      ],
      createdAt: new Date(),
    },
  ],
  corporativos: [
    {
      id: "demo-5",
      title: "Confraternização Anual Empresa XYZ",
      description:
        "Evento corporativo para 200 colaboradores com jantar de gala, premiações e apresentações especiais. A decoração em tons de azul e prata criou um ambiente profissional e ao mesmo tempo acolhedor.",
      category: "corporativos",
      images: [
        "/elegant-corporate-event.png",
        "/placeholder.svg?height=600&width=800&query=corporate gala dinner",
        "/placeholder.svg?height=600&width=800&query=business award ceremony",
      ],
      createdAt: new Date(),
    },
  ],
}

// Verifica se o Firebase está configurado
const isFirebaseConfigured = () => {
  try {
    return !!db && !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  } catch (error) {
    return false
  }
}

// Add a new event
export const addEvent = async (eventData: Omit<EventData, "id">) => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase não está configurado. Operação simulada.")
    return "demo-id-" + Math.random().toString(36).substring(2, 9)
  }

  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...eventData,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding event: ", error)
    throw error
  }
}

// Get events by category
export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  // Se o Firebase não estiver configurado, retorna dados de demonstração
  if (!isFirebaseConfigured()) {
    console.warn("Firebase não está configurado. Retornando dados de demonstração.")
    return demoEvents[category] || []
  }

  try {
    const eventsRef = collection(db, "events")
    const q = query(eventsRef, where("category", "==", category), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const events: Event[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Event, "id">
      events.push({
        id: doc.id,
        ...data,
      })
    })

    console.log("[DEBUG] Categoria buscada:", category)
    console.log("[DEBUG] Eventos retornados:", events)

    return events
  } catch (error) {
    console.error("Error getting events: ", error)
    throw error
  }
}

// Delete an event
export const deleteEvent = async (eventId: string) => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase não está configurado. Operação simulada.")
    return
  }

  try {
    await deleteDoc(doc(db, "events", eventId))
  } catch (error) {
    console.error("Error deleting event: ", error)
    throw error
  }
}
