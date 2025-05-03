"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  eventType: z.string().min(1, { message: "Selecione o tipo de evento" }),
  date: z.string().min(1, { message: "Data é obrigatória" }),
  description: z.string().min(10, { message: "Descrição é obrigatória" }),
  guests: z.string().min(1, { message: "Número de convidados é obrigatório" }),
  location: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      description: "",
      guests: "",
      location: "",
    },
  })

  const eventType = watch("eventType")

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Formspree endpoint - replace with your form ID
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato em breve.",
        })
        reset()
      } else {
        throw new Error("Falha ao enviar o formulário")
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

  const formVariants = {
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

  return (
    <section id="contato" ref={sectionRef} className="section-spacing bg-off-white overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl font-playfair font-bold text-grafite mb-4"
          >
            Entre em <span className="text-dourado">Contato</span>
          </motion.h2>
          <motion.p variants={titleVariants} className="text-lg text-grafite/80 max-w-2xl mx-auto">
            Estamos ansiosos para tornar seu evento inesquecível
          </motion.p>
        </motion.div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate={controls}
          className="bg-white p-8 md:p-10 shadow-soft"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-grafite">
                  Nome completo *
                </label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  {...register("name")}
                  className={`input-minimal focus-ring ${errors.name ? "border-red-300" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-grafite">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  {...register("email")}
                  className={`input-minimal focus-ring ${errors.email ? "border-red-300" : ""}`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-grafite">
                  Telefone *
                </label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                  className={`input-minimal focus-ring ${errors.phone ? "border-red-300" : ""}`}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="eventType" className="block text-sm font-medium text-grafite">
                  Tipo de evento *
                </label>
                <Select onValueChange={(value) => setValue("eventType", value)} defaultValue={eventType}>
                  <SelectTrigger className={`focus-ring ${errors.eventType ? "border-red-300" : ""}`}>
                    <SelectValue placeholder="Selecione o tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casamento">Casamento</SelectItem>
                    <SelectItem value="15anos">Festa de 15 Anos</SelectItem>
                    <SelectItem value="aniversario">Aniversário</SelectItem>
                    <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.eventType && <p className="text-sm text-red-500 mt-1">{errors.eventType.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-grafite">
                  Data e horário *
                </label>
                <Input
                  id="date"
                  placeholder="Ex: Dezembro de 2025, noite"
                  {...register("date")}
                  className={`input-minimal focus-ring ${errors.date ? "border-red-300" : ""}`}
                />
                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="guests" className="block text-sm font-medium text-grafite">
                  Número de convidados *
                </label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="Ex: 150"
                  {...register("guests")}
                  className={`input-minimal focus-ring ${errors.guests ? "border-red-300" : ""}`}
                />
                {errors.guests && <p className="text-sm text-red-500 mt-1">{errors.guests.message}</p>}
              </div>
            </div>

            {eventType === "casamento" && (
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-grafite">
                  Local da cerimônia
                </label>
                <Input
                  id="location"
                  placeholder="Local da cerimônia (se diferente da recepção)"
                  {...register("location")}
                  className="input-minimal focus-ring"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-grafite">
                Descrição do evento *
              </label>
              <Textarea
                id="description"
                placeholder="Conte-nos mais sobre o seu evento..."
                rows={5}
                {...register("description")}
                className={`resize-none border-0 border-b-2 border-gray-200 rounded-none px-0 focus:border-dourado focus:ring-0 focus-ring ${
                  errors.description ? "border-red-300" : ""
                }`}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dourado hover:bg-dourado/90 text-white py-3 rounded-none btn-minimal btn-shine"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
