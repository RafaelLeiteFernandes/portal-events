"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginProps {
  demoMode?: boolean
  onDemoLogin?: (email: string) => void
}

export default function AdminLogin({ demoMode = false, onDemoLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (demoMode) {
        // Demo mode login
        if (email === "admin@demo.com" && password === "demo123") {
          toast({
            title: "Login de demonstração realizado",
            description: "Você está no modo de demonstração.",
          })
          if (onDemoLogin) onDemoLogin(email)
        } else {
          throw new Error("Credenciais inválidas")
        }
      } else if (auth) {
        // Real Firebase login
        await signInWithEmailAndPassword(auth, email, password)
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo.",
        })
      } else {
        throw new Error("Firebase Auth não está configurado")
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white p-4">
      <div className="bg-white p-10 w-full max-w-md shadow-soft">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair font-bold text-grafite mb-3">Portal das Águas</h1>
          <p className="text-grafite/70">Acesso ao painel administrativo</p>
          {demoMode && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-700 text-sm">
                <strong>Modo de demonstração ativo</strong>
                <br />
                Use email: admin@demo.com
                <br />
                Senha: demo123
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-grafite">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              required
              className="input-minimal"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-grafite">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-minimal"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-dourado hover:bg-dourado/90 text-white rounded-none btn-shine"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  )
}
