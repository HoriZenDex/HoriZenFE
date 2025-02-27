"use client"

import { useState } from "react"
import ExplorerGallery from "./ExplorerGallery"
import NFTDetails from "./NFTDetails"
import type { NFT } from "@/lib/types"

interface ExplorerProps {
  walletAddress: string | null
  nfts: NFT[]
}

const NFT_CONTRACT_ADDRESS = '0x...' // Tu dirección del contrato

export default function Explorer({ walletAddress, nfts }: ExplorerProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [currentFilter, setCurrentFilter] = useState<"all" | "image" | "video">("all")

  const filteredNFTs = nfts.filter((nft) => currentFilter === "all" || nft.type === currentFilter)

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
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-gray-900/50 to-black/90 pt-4">
      {selectedNFT ? (
        <NFTDetails nft={selectedNFT} onClose={handleCloseNFT} onNavigate={handleNavigateNFT} />
      ) : (
        <ExplorerGallery
          onSelectNFT={handleSelectNFT}
          filteredNFTs={filteredNFTs}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          contractAddress={NFT_CONTRACT_ADDRESS as `0x${string}`}
        />
      )}
    </div>
  )
}

