"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Music",
    items: [
      {
        title: "Cosmic Beats",
        creator: "StellarSound",
        image:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Nebula Rhythms",
        creator: "GalacticGroove",
        image:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Quantum Harmonies",
        creator: "WaveFunction",
        image:
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
  {
    name: "Video Games",
    items: [
      {
        title: "Astro Legends",
        creator: "NebulaGames",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Cyber Odyssey",
        creator: "QuantumPlay",
        image:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Ethereal Quest",
        creator: "DreamForge",
        image:
          "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
  {
    name: "Fashion",
    items: [
      {
        title: "Futuristic Couture",
        creator: "NeonStitcher",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Cyberpunk Chic",
        creator: "DigitalDraper",
        image:
          "https://images.unsplash.com/photo-1536243298747-ea8874136d64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Holographic Haute",
        creator: "QuantumCouturier",
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
  {
    name: "Art",
    items: [
      {
        title: "Neon Nebula",
        creator: "GlowMaster",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Digital Dreamscape",
        creator: "CyberCanvas",
        image:
          "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Quantum Fractals",
        creator: "PixelSorcerer",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
]

export default function TrendingCategories() {
  return (
    <div className="px-4 py-8 bg-gray-900/30">
      <h2 className="text-2xl font-bold text-cosmic-cyan mb-6">Trending in All Categories</h2>
      <Tabs defaultValue={categories[0].name} className="w-full">
        <TabsList className="w-full flex justify-start mb-6 bg-black/40 p-1 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-cosmic-mint/20 data-[state=active]:text-cosmic-cyan"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black/60 border-cosmic-mint/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-400">by {item.creator}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

