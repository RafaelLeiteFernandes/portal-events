import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Verifica se as variáveis de ambiente estão definidas
const hasValidConfig = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
}

let app, auth, db, storage

try {
  if (hasValidConfig()) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

    // Initialize Firebase
    app = initializeApp(firebaseConfig)

    // Initialize Firebase services
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } else {
    console.warn("Configuração do Firebase incompleta. Usando modo de demonstração.")
  }
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error)
}

export { app, auth, db, storage }
export default app
