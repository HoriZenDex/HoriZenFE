"use client"

import { useState } from "react"
import Image from "next/image"
import type { NFT } from "@/lib/types"
import { ViewIcon as View360 } from "lucide-react"

interface ExplorerGalleryProps {
  onSelectNFT: (nft: NFT) => void
  filteredNFTs: NFT[]
  currentFilter: "all" | "image" | "video"
  setCurrentFilter: (filter: "all" | "image" | "video") => void
}

export default function ExplorerGallery({
  onSelectNFT,
  filteredNFTs,
  currentFilter,
  setCurrentFilter,
}: ExplorerGalleryProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="flex space-x-4 mb-6">
        {["all", "image", "video"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${
              currentFilter === filter ? "bg-cosmic-cyan text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setCurrentFilter(filter as "all" | "image" | "video")}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4">
              <p className="text-white text-center font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {nft.title}
              </p>
              <div className="flex items-center space-x-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                <span className="bg-cosmic-cyan text-black text-xs font-semibold px-2 py-1 rounded-full">
                  {nft.type === "video" ? "Video" : "Image"}
                </span>
                {nft.type === "video" && (
                  <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Max 20s</span>
                )}
              </div>
            </div>
            {nft.is360 && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-[#03ceb3] to-[#9370db] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 backdrop-blur-sm bg-opacity-70">
                <View360 className="w-3 h-3" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">360°</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

