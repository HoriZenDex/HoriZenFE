"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Rocket, Award, Globe, MessageCircle, Mail, Twitter, Github, Linkedin, ArrowLeft } from "lucide-react"
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import teamMembers from "./teamMembers"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-cosmic-cyan hover:text-cosmic-mint transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight bg-gradient-to-r from-cosmic-mint via-cosmic-cyan to-cosmic-purple bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Redefining Digital<br />Ownership
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            HoriZen is a revolutionary NFT platform where creators and collectors come together to explore the future of
            digital content.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <Button className="bg-gradient-to-r from-cosmic-mint to-cosmic-cyan hover:from-cosmic-cyan hover:to-cosmic-mint text-black font-bold px-10 py-7 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-cosmic-mint/20">
              Explore HoriZen
            </Button>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="flex flex-col space-y-24">
          {/* About Tabs Section */}
          <section>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-900/50 border border-cosmic-mint/20 p-1 rounded-full">
                  <TabsTrigger
                    value="mission"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Our Mission
                  </TabsTrigger>
                  <TabsTrigger
                    value="vision"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Our Vision
                  </TabsTrigger>
                  <TabsTrigger
                    value="values"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-cosmic-mint data-[state=active]:text-black"
                  >
                    Our Values
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mission" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-cosmic-cyan mb-6">Our Mission</h2>
                    <p className="text-gray-300 mb-4">
                      At HoriZen, our mission is to empower creators and collectors through blockchain technology,
                      creating a more equitable digital economy where artists receive fair compensation for their work
                      and collectors truly own their digital assets.
                    </p>
                    <p className="text-gray-300 mb-6">
                      We're dedicated to pushing the boundaries of what's possible in the NFT space, with a particular
                      focus on immersive experiences like 360° content and video NFTs that create deeper connections
                      between creators and their audiences.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Empower creators with tools to monetize their work",
                        "Provide collectors with true ownership of digital assets",
                        "Build a vibrant community around digital art and experiences",
                        "Push the boundaries of immersive content in the NFT space",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-cosmic-mint/20 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-cosmic-mint"></div>
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="HoriZen Mission"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Rocket className="h-5 w-5 text-cosmic-cyan" />
                        <span className="text-cosmic-cyan font-semibold">Born at Celestia Mammothon</span>
                      </div>
                      <p className="text-white text-sm">
                        HoriZen was conceived during the Celestia Mammothon, where our team came together to reimagine
                        digital content ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vision" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="HoriZen Vision"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="h-5 w-5 text-cosmic-cyan" />
                        <span className="text-cosmic-cyan font-semibold">Global Creator Economy</span>
                      </div>
                      <p className="text-white text-sm">
                        We envision a world where creators from anywhere can thrive in the digital economy.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-3xl font-bold text-cosmic-cyan mb-6">Our Vision</h2>
                    <p className="text-gray-300 mb-4">
                      We envision a future where digital ownership is as intuitive and valuable as physical ownership,
                      where creators are fairly compensated for their work, and where immersive digital experiences
                      bring people together across the globe.
                    </p>
                    <p className="text-gray-300 mb-6">
                      HoriZen aims to be at the forefront of this revolution, creating a platform that not only
                      facilitates transactions but fosters genuine connections between creators and their audiences
                      through innovative technologies and experiences.
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Democratized Creation",
                          description:
                            "A world where anyone can create, share, and profit from their digital content without intermediaries.",
                        },
                        {
                          title: "Immersive Experiences",
                          description:
                            "Pushing the boundaries of what's possible with digital content through 360° experiences and more.",
                        },
                        {
                          title: "Global Community",
                          description:
                            "Building bridges between creators and audiences across geographical and cultural boundaries.",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-900/30 border border-cosmic-mint/10 rounded-lg p-4">
                          <h3 className="text-cosmic-cyan font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="values" className="mt-0">
                <h2 className="text-3xl font-bold text-cosmic-cyan mb-8 text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Award,
                      title: "Excellence",
                      description:
                        "We strive for excellence in everything we do, from platform development to community engagement.",
                    },
                    {
                      icon: Users,
                      title: "Community",
                      description:
                        "We believe in the power of community and work to foster meaningful connections between creators and collectors.",
                    },
                    {
                      icon: Globe,
                      title: "Accessibility",
                      description:
                        "We're committed to making Web3 technologies accessible to everyone, regardless of technical background.",
                    },
                    {
                      icon: Rocket,
                      title: "Innovation",
                      description:
                        "We constantly push the boundaries of what's possible in the NFT space through technological innovation.",
                    },
                    {
                      icon: MessageCircle,
                      title: "Transparency",
                      description:
                        "We operate with complete transparency in all aspects of our business and community interactions.",
                    },
                    {
                      icon: Award,
                      title: "Sustainability",
                      description:
                        "We're committed to building a platform that's sustainable both environmentally and economically.",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-gray-900/80 to-black/90 border border-cosmic-mint/10 hover:border-cosmic-mint/30 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-mint/10 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-cosmic-mint/10 flex items-center justify-center mb-4 group-hover:bg-cosmic-mint/20 transition-colors duration-300">
                        <value.icon className="h-6 w-6 text-cosmic-cyan" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cosmic-cyan transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Team Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cosmic-cyan mb-4">Meet Our Team</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                The passionate individuals behind HoriZen, working together to revolutionize digital content ownership.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-900/50 border-gray-800/50 hover:border-cosmic-mint/20 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-mint/10 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cosmic-cyan transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-cosmic-cyan text-sm mb-2">{member.role}</p>
                        <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                        <div className="flex space-x-3">
                          {Object.entries(member.social).map(([platform, url], i) => {
                            const Icon = platform === "twitter" ? Twitter : platform === "linkedin" ? Linkedin : Github
                            return (
                              <a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cosmic-cyan transition-colors"
                              >
                                <Icon className="h-5 w-5" />
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-gray-900/80 to-black/90 border border-cosmic-mint/10 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-cosmic-cyan mb-6">Get In Touch</h2>
                <p className="text-gray-300 mb-6">
                  Have questions, suggestions, or just want to say hello? We'd love to hear from you! Reach out to our
                  team using any of the methods below.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-cosmic-cyan mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Email Us</h3>
                      <p className="text-gray-300">HoriZenCR@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Twitter className="h-6 w-6 text-cosmic-cyan mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Follow Us</h3>
                      <p className="text-gray-300">@HoriZenOfficial</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageCircle className="h-6 w-6 text-cosmic-cyan mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Join Our Community</h3>
                      <p className="text-gray-300">Discord: HoriZen Community</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-6 border border-cosmic-mint/10">
                <h3 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Stay updated with the latest news, features, and creator spotlights from HoriZen.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-cyan"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-cyan"
                      placeholder="Your email address"
                    />
                  </div>
                  <Button className="w-full bg-cosmic-cyan hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cosmic-cyan/50 relative overflow-hidden group">
                    <span className="relative z-10">Subscribe</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                  </Button>
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

