"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AriaChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [demoQuestionsUsed, setDemoQuestionsUsed] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const demoResponses = [
    "Bonjour ! Je suis ARIA, votre assistant IA pédagogique spécialisé dans la réussite au Baccalauréat et l'excellence à Parcoursup. Je peux vous aider avec les mathématiques, la NSI, le français, la philosophie et toutes les matières du programme. Posez-moi votre première question !",
    "Excellente question ! Pour bien maîtriser ce concept essentiel au Bac, commençons par les fondamentaux... Pour une explication complète avec des exercices personnalisés et un suivi de vos progrès, créez votre compte Nexus Réussite.",
    "Vous avez atteint la limite de cette démonstration gratuite ! Pour continuer à bénéficier de mon aide 24/7 et accéder à tous mes contenus pédagogiques exclusifs, inscrivez-vous maintenant et commencez votre parcours vers l'excellence."
  ]

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulation de réponse pour la démo
    setTimeout(() => {
      const ariaMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: demoResponses[Math.min(demoQuestionsUsed, demoResponses.length - 1)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, ariaMessage])
      setDemoQuestionsUsed(prev => prev + 1)
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-xl bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Bulle d'invitation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3 }}
          className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs border border-gray-200"
        >
          <div className="flex items-start space-x-2">
            <Image
              src="/images/aria.png"
              alt="ARIA"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">ARIA</p>
              <p className="text-xs text-gray-600">
                Bonjour ! Essayez-moi gratuitement 👋
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px]"
          >
            <Card className="h-full shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/aria.png"
                      alt="ARIA"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">ARIA</CardTitle>
                      <p className="text-sm text-white/90">Assistant IA Pédagogique</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Image
                        src="/images/aria.png"
                        alt="ARIA"
                        width={64}
                        height={64}
                        className="mx-auto mb-4 rounded-full"
                      />
                      <p className="text-sm">
                        Posez-moi une question pour commencer !<br />
                        <span className="text-xs text-primary-600">
                          Démonstration gratuite (3 questions)
                        </span>
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === 'assistant' && (
                            <Bot className="w-4 h-4 mt-0.5 text-primary-500" />
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-primary-500" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {demoQuestionsUsed >= 3 && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-primary-800 mb-3">
                        Démonstration terminée ! 🎉
                      </p>
                      <Button asChild size="sm" className="w-full">
                        <a href="/bilan-gratuit">
                          Créer mon Compte Gratuit
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Input */}
                {demoQuestionsUsed < 3 && (
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Posez votre question..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Questions restantes : {3 - demoQuestionsUsed}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}