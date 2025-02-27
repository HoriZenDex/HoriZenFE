"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { NFT } from "@/lib/types"
import { ViewIcon as View360 } from "lucide-react"
import { useReadContract } from 'wagmi'
import { abi } from '../../VideoNFTMarketplace.json'

interface ExplorerGalleryProps {
  onSelectNFT: (nft: NFT) => void
  filteredNFTs: NFT[]
  currentFilter: "all" | "image" | "video"
  setCurrentFilter: (filter: "all" | "image" | "video") => void
  contractAddress: `0x${string}`
}

export default function ExplorerGallery({
  onSelectNFT,
  filteredNFTs,
  currentFilter,
  setCurrentFilter,
  contractAddress,
}: ExplorerGalleryProps) {
  const [selectedTokenId, setSelectedTokenId] = useState<number>(18)

  const { data: tokenURI } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'tokenURI',
    args: [BigInt(selectedTokenId)],
  })

  const handleNFTClick = (nft: NFT) => {
    setSelectedTokenId(nft.id)
    onSelectNFT(nft)
  }

  useEffect(() => {
    if (tokenURI) {
      console.log(`TokenURI for token ${selectedTokenId}:`, tokenURI)
    }
  }, [tokenURI, selectedTokenId])

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
            onClick={() => handleNFTClick(nft)}
          >
            <Image src={nft.url || "/placeholder.svg"} alt={nft.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
              <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {nft.title}
              </p>
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

