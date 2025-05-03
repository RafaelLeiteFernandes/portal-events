"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [demoMode, setDemoMode] = useState(false)
  const [demoUser, setDemoUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if Firebase Auth is configured
    if (!auth) {
      console.log("Firebase Auth not configured, using demo mode")
      setDemoMode(true)
      setLoading(false)
      return
    }

    // If Firebase Auth is configured, use it
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  // Handle demo login
  const handleDemoLogin = (email: string) => {
    setDemoUser({
      email,
      uid: "demo-user-id",
      displayName: "Demo User",
    })
  }

  // Handle demo logout
  const handleDemoLogout = () => {
    setDemoUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dourado"></div>
      </div>
    )
  }

  // If in demo mode, use demo authentication
  if (demoMode) {
    return (
      <div className="min-h-screen bg-off-white">
        {demoUser ? (
          <AdminDashboard user={demoUser} demoMode={true} onLogout={handleDemoLogout} />
        ) : (
          <AdminLogin demoMode={true} onDemoLogin={handleDemoLogin} />
        )}
      </div>
    )
  }

  // Normal Firebase authentication flow
  return <div className="min-h-screen bg-off-white">{user ? <AdminDashboard user={user} /> : <AdminLogin />}</div>
}
