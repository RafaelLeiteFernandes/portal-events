import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"
import { v4 as uuidv4 } from "uuid"

// Verifica se o Firebase Storage está configurado
const isStorageConfigured = () => {
  try {
    return !!storage
  } catch (error) {
    return false
  }
}

// Upload multiple images and return their URLs
export const uploadImages = async (images: File[], category: string): Promise<string[]> => {
  // Se o Firebase Storage não estiver configurado, retorna URLs de placeholder
  if (!isStorageConfigured()) {
    console.warn("Firebase Storage não está configurado. Retornando URLs de placeholder.")
    return images.map(
      (image, index) => `/placeholder.svg?height=800&width=1200&query=${category} event image ${index + 1}`,
    )
  }

  try {
    const imageUrls: string[] = []

    for (const image of images) {
      const fileName = `${category}/${uuidv4()}-${image.name}`
      const storageRef = ref(storage, fileName)

      await uploadBytes(storageRef, image)
      const downloadUrl = await getDownloadURL(storageRef)

      imageUrls.push(downloadUrl)
    }

    return imageUrls
  } catch (error) {
    console.error("Error uploading images: ", error)
    throw error
  }
}
