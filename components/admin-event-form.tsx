"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addEvent } from "@/lib/firestore"
import { uploadImages } from "@/lib/storage"
import { X, Upload, Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(3, { message: "Título é obrigatório" }),
  description: z.string().min(10, { message: "Descrição é obrigatória" }),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
})

type FormValues = z.infer<typeof formSchema>

interface AdminEventFormProps {
  demoMode?: boolean
}

export default function AdminEventForm({ demoMode = false }: AdminEventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "casamentos",
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      if (selectedFiles.length > 5) {
        toast({
          title: "Limite excedido",
          description: "Você pode enviar no máximo 5 imagens por evento.",
          variant: "destructive",
        })
        return
      }

      setImages(selectedFiles)

      // Create preview URLs
      const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file))
      setImagePreviewUrls(newPreviewUrls)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviewUrls = [...imagePreviewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setImagePreviewUrls(newPreviewUrls)
  }

  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast({
        title: "Imagens obrigatórias",
        description: "Adicione pelo menos uma imagem para o evento.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      let imageUrls: string[] = []

      if (demoMode) {
        // No modo de demonstração, usamos URLs de placeholder
        imageUrls = images.map(
          (_, index) => `/placeholder.svg?height=800&width=1200&query=event image ${index + 1} ${data.category}`,
        )
      } else {
        // Upload real de imagens para o Firebase Storage
        imageUrls = await uploadImages(images, data.category)
      }

      // Add event to Firestore (real ou simulado)
      await addEvent({
        title: data.title,
        description: data.description,
        category: data.category,
        images: imageUrls,
        createdAt: new Date(),
      })

      toast({
        title: "Evento publicado!",
        description: "O evento foi adicionado com sucesso.",
      })

      // Reset form
      reset()
      setImages([])
      setImagePreviewUrls([])
    } catch (error) {
      console.error("Erro ao publicar evento:", error)
      toast({
        title: "Erro ao publicar",
        description: "Ocorreu um erro. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {demoMode && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-6">
          <p className="text-amber-700 text-sm">
            <strong>Modo de demonstração:</strong> O evento será simulado e não será realmente salvo.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-grafite">
          Título do evento *
        </label>
        <Input
          id="title"
          placeholder="Ex: Casamento de Ana e Pedro"
          {...register("title")}
          className={errors.title ? "border-red-300" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium text-grafite">
          Categoria *
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="casamentos">Casamentos</option>
          <option value="15-anos">Festas de 15 Anos</option>
          <option value="aniversarios">Aniversários</option>
          <option value="corporativos">Eventos Corporativos</option>
        </select>
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-grafite">
          Descrição do evento *
        </label>
        <Textarea
          id="description"
          placeholder="Descreva os detalhes do evento..."
          rows={6}
          {...register("description")}
          className={errors.description ? "border-red-300" : ""}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-grafite">Imagens do evento * (máximo 5)</label>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="images" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Clique para selecionar imagens</span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG ou JPEG (máx. 5MB cada)</span>
          </label>
        </div>

        {imagePreviewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-dourado hover:bg-dourado/90 text-white">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publicando...
          </>
        ) : (
          "Publicar evento"
        )}
      </Button>
    </form>
  )
}
