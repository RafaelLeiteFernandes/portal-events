"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CategoriesSection from "@/components/categories-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { useScrollReveal } from "@/lib/scroll-reveal"

export default function Home() {
  // Use the scroll reveal hook
  useScrollReveal()

  return (
    <main className="min-h-screen bg-off-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
