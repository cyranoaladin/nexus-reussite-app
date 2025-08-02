"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PillarsSection } from "@/components/sections/pillars-section"
import { BusinessModelSection } from "@/components/sections/business-model-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <BusinessModelSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}