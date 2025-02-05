"use client"

import Image from "next/image"
import { memo } from "react"

const galleryItems = [
  { id: 1, title: "Cosmic Voyage", creator: "Stella Nova", image: "/placeholder.svg?height=300&width=200" },
  { id: 2, title: "Digital Dreams", creator: "Pixel Master", image: "/placeholder.svg?height=400&width=200" },
  { id: 3, title: "Neon Nights", creator: "Glow Wizard", image: "/placeholder.svg?height=250&width=200" },
  { id: 4, title: "Quantum Quests", creator: "Data Dynamo", image: "/placeholder.svg?height=350&width=200" },
  { id: 5, title: "Cyberpunk City", creator: "Neon Nomad", image: "/placeholder.svg?height=300&width=200" },
  { id: 6, title: "Ethereal Echoes", creator: "Mystic Maker", image: "/placeholder.svg?height=400&width=200" },
  { id: 7, title: "Retro Rewind", creator: "Vintage Visionary", image: "/placeholder.svg?height=250&width=200" },
  { id: 8, title: "Future Fusion", creator: "Tech Trendsetter", image: "/placeholder.svg?height=350&width=200" },
]

const GalleryItem = memo(function GalleryItem({ item }: { item: (typeof galleryItems)[0] }) {
  return (
    <div className="break-inside-avoid mb-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={200}
          height={Math.floor(Math.random() * (400 - 200 + 1)) + 200}
          className="w-full h-auto object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600">by {item.creator}</p>
        </div>
      </div>
    </div>
  )
})

export function VideoNFTGallery() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
        Trending Video NFTs
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {galleryItems.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

