"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Mail, MessageCircle, ExternalLink, ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import Link from "next/link"
import faqData from "./faqData"

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-cosmic-cyan hover:text-cosmic-mint transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cosmic-mint via-cosmic-cyan to-cosmic-purple bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about HoriZen, our features, and how to get started.
          </motion.p>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col space-y-12">
          {/* FAQ Tabs Section */}
          <section>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center overflow-x-auto pb-2 mb-8">
                <TabsList className="bg-gray-900/50 border border-cosmic-mint/20 p-1 rounded-full inline-flex whitespace-nowrap">
                  <TabsTrigger
                    value="general"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="creators"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    For Creators
                  </TabsTrigger>
                  <TabsTrigger
                    value="collectors"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    For Collectors
                  </TabsTrigger>
                  <TabsTrigger
                    value="technical"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Technical
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="rounded-full px-4 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Features
                  </TabsTrigger>
                </TabsList>
              </div>

              {Object.entries(faqData).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="max-w-3xl mx-auto space-y-4">
                    {questions.map((item, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="bg-gray-900/50 border border-gray-800 hover:border-cosmic-mint/20 rounded-lg overflow-hidden transition-all duration-300"
                      >
                        <button
                          className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                          onClick={() => toggleQuestion(index)}
                        >
                          <span className="text-lg font-medium text-white">{item.question}</span>
                          {expandedQuestion === index ? (
                            <ChevronUp className="h-5 w-5 text-cosmic-cyan flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-cosmic-cyan flex-shrink-0" />
                          )}
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedQuestion === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="p-4 pt-0 text-gray-300">{item.answer}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Still Have Questions Section */}
          <section className="bg-gradient-to-br from-gray-900/80 to-black/90 border border-cosmic-mint/10 rounded-lg p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Still Have Questions?</h2>
              <p className="text-gray-300 mb-8">
                Can't find the answer you're looking for? Please reach out to our support team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/30 rounded-lg p-4 px-3 border border-cosmic-mint/10 hover:border-cosmic-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-mint/10 group flex flex-col h-full">
                  <div>
                    <Mail className="h-8 w-8 text-cosmic-cyan mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                    <p className="text-gray-400 text-sm mb-4">Get in touch with our support team via email.</p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-cosmic-cyan hover:text-cosmic-mint transition-colors text-center break-all">
                      HoriZenCR@gmail.com
                    </p>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 px-3 border border-cosmic-mint/10 hover:border-cosmic-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-mint/10 group flex flex-col h-full">
                  <div>
                    <MessageCircle className="h-8 w-8 text-cosmic-cyan mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-white mb-2">Discord Community</h3>
                    <p className="text-gray-400 text-sm mb-4">Join our Discord for community support.</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://discord.gg/Z7jQjnqZRx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cosmic-cyan hover:text-cosmic-mint transition-colors inline-flex items-center justify-center w-full"
                    >
                      Join Discord
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 px-3 border border-cosmic-mint/10 hover:border-cosmic-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-mint/10 group flex flex-col h-full">
                  <div>
                    <svg
                      className="h-8 w-8 text-cosmic-cyan mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Twitter Support</h3>
                    <p className="text-gray-400 text-sm mb-4">Reach out to us on Twitter for quick responses.</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://x.com/HoriZenOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cosmic-cyan hover:text-cosmic-mint transition-colors inline-flex items-center justify-center w-full"
                    >
                      @HoriZen
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <Navbar />
    </div>
  )
}

