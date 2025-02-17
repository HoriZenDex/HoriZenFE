"use client"

import { useState } from "react"
import ExplorerGallery from "./ExplorerGallery"
import NFTDetails from "./NFTDetails"
import type { NFT } from "@/lib/types"
import { nftExamples } from "@/lib/data"

interface ExplorerProps {
  walletAddress: string | null
}

export default function Explorer({ walletAddress }: ExplorerProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [currentFilter, setCurrentFilter] = useState<"all" | "image" | "video">("all")

  const filteredNFTs = nftExamples.filter((nft) => currentFilter === "all" || nft.type === currentFilter)

  const handleSelectNFT = (nft: NFT) => {
    setSelectedNFT(nft)
  }

  const handleCloseNFT = () => {
    setSelectedNFT(null)
  }

  const handleNavigateNFT = (direction: "prev" | "next") => {
    if (!selectedNFT) return

    const currentIndex = filteredNFTs.findIndex((nft) => nft.id === selectedNFT.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredNFTs.length - 1
    } else {
      newIndex = currentIndex < filteredNFTs.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedNFT(filteredNFTs[newIndex])
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-black via-black/95 to-black/90">
      {selectedNFT ? (
        <NFTDetails nft={selectedNFT} onClose={handleCloseNFT} onNavigate={handleNavigateNFT} />
      ) : (
        <ExplorerGallery
          onSelectNFT={handleSelectNFT}
          filteredNFTs={filteredNFTs}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      )}
    </div>
  )
}

