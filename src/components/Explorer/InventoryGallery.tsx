"use client"

import { useState } from "react"
import Image from "next/image"
import type { NFT } from "@/src/lib/types"
import { nftExamples } from "@/src/lib/data"

interface InventoryGalleryProps {
  onSelectNFT: (nft: NFT) => void
}

export default function InventoryGallery({ onSelectNFT }: InventoryGalleryProps) {
  const [currentCategory, setCurrentCategory] = useState<"all" | "normal" | "rare" | "super-rare">("all")

  const userNFTs = nftExamples.filter((_, index) => index % 3 === 0) // Simulating user's NFTs (every 3rd NFT)

  const categorizedNFTs = userNFTs.map((nft) => ({
    ...nft,
    category: nft.bonusFeatures > 2 ? "super-rare" : nft.bonusFeatures === 2 ? "rare" : "normal",
  }))

  const filteredNFTs = categorizedNFTs.filter((nft) => currentCategory === "all" || nft.category === currentCategory)

  const categoryColors = {
    normal: "bg-blue-500",
    rare: "bg-purple-500",
    "super-rare": "bg-yellow-500",
  }

  return (
    <div className="flex-1 overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-cosmic-cyan mb-6">My NFTs</h2>
      <div className="flex space-x-4 mb-6">
        {["all", "normal", "rare", "Super-Rare"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              currentCategory === category.toLowerCase()
                ? "bg-cosmic-cyan text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setCurrentCategory(category.toLowerCase() as "all" | "normal" | "rare" | "super-rare")}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredNFTs.map((nft) => (
          <div
            key={nft.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => onSelectNFT(nft)}
          >
            <Image src={nft.url || "/placeholder.svg"} alt={nft.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
              <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {nft.title}
              </p>
            </div>
            <div
              className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                categoryColors[nft.category as keyof typeof categoryColors]
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

