"use client"

import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PillarsSection } from "@/components/sections/pillars-section"
import { BusinessModelSection } from "@/components/sections/business-model-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { StagesIntensifsSection } from "@/components/sections/stages-intensifs-section"
import { CandidatLibreSection } from "@/components/sections/candidat-libre-section"
import { StagesIntensifsSection } from "@/components/sections/stages-intensifs-section"
import { CandidatLibreSection } from "@/components/sections/candidat-libre-section"
import { CTASection } from "@/components/sections/cta-section"
import { AriaChat } from "@/components/ui/aria-chat"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <HowItWorksSection />
        <BusinessModelSection />
        <StagesIntensifsSection />
        <CandidatLibreSection />
        <StagesIntensifsSection />
        <CandidatLibreSection />
        <CTASection />
      </main>
      <Footer />
      <AriaChat />
    </div>
  )
}