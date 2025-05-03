import type { Timestamp } from "firebase/firestore"

export interface EventData {
  title: string
  description: string
  category: string
  images: string[]
  createdAt: Date | Timestamp
}

export interface Event extends EventData {
  id: string
}
