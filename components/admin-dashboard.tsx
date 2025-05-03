"use client"

import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminEventForm from "./admin-event-form"
import AdminEventList from "./admin-event-list"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminDashboardProps {
  user: any
  demoMode?: boolean
  onLogout?: () => void
}

export default function AdminDashboard({ user, demoMode = false, onLogout }: AdminDashboardProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("publicar")
  const [selectedCategory, setSelectedCategory] = useState("casamentos")
  const router = useRouter()

  const handleLogout = async () => {
    try {
      if (demoMode && onLogout) {
        // Demo mode logout
        onLogout()
        toast({
          title: "Logout de demonstração realizado",
        })
      } else if (auth) {
        // Real Firebase logout
        await signOut(auth)
        toast({
          title: "Logout realizado com sucesso",
        })
      } else {
        throw new Error("Firebase Auth não está configurado")
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      toast({
        title: "Erro ao fazer logout",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold text-grafite">Painel Administrativo</h1>

          <div className="flex items-center gap-4">
            <span className="text-grafite/70">{user?.email || "admin@demo.com"}</span>
            {demoMode && <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Demo</span>}
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {demoMode && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-700">
              <strong>Modo de demonstração ativo</strong> - As operações de criação e exclusão de eventos são simuladas.
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="publicar">Publicar Evento</TabsTrigger>
            <TabsTrigger value="gerenciar">Gerenciar Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="publicar">
            <div className="bg-white rounded-lg shadow-md p-6">
              <AdminEventForm demoMode={demoMode} />
            </div>
          </TabsContent>

          <TabsContent value="gerenciar">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <label htmlFor="category-filter" className="block text-sm font-medium text-grafite mb-2">
                  Filtrar por categoria
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="casamentos">Casamentos</option>
                  <option value="15-anos">Festas de 15 Anos</option>
                  <option value="aniversarios">Aniversários</option>
                  <option value="corporativos">Eventos Corporativos</option>
                </select>
              </div>

              <AdminEventList category={selectedCategory} demoMode={demoMode} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
