"use client"

import { useState, useEffect } from "react"
import Explorer from "@/components/Explorer/Explorer"
import Navbar from "@/components/Navbar/Navbar"
import ExplorerHeader from "@/components/Explorer/ExplorerHeader"
import TrendingCreators from "@/components/TrendingCreators/TrendingCreators"
import TrendingCategories from "@/components/TrendingCategories/TrendingCategories"
import ZenZoneButton from "@/components/ZenZoneButton/ZenZoneButton"
import Footer from "@/components/Footer/Footer" 
import { nftExamples, trendingCreators } from "@/lib/data"

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNFTs, setFilteredNFTs] = useState(nftExamples)
  const [filteredCreators, setFilteredCreators] = useState(trendingCreators)

  const connectWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
    setWalletAddress(mockAddress)
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase()
    const nftResults = nftExamples.filter(
      (nft) => nft.title.toLowerCase().includes(lowerSearchTerm) || nft.creator.toLowerCase().includes(lowerSearchTerm),
    )
    const creatorResults = trendingCreators.filter((creator) => creator.name.toLowerCase().includes(lowerSearchTerm))

    setFilteredNFTs(nftResults)
    setFilteredCreators(creatorResults)
  }, [searchTerm])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <ExplorerHeader
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-1 overflow-y-auto">
        <ZenZoneButton />
        <Explorer walletAddress={walletAddress} nfts={filteredNFTs} />
        <TrendingCreators creators={trendingCreators.slice(0, 5)} />
        <TrendingCategories />
        <Footer />
      </main>
      <Navbar />
    </div>
  )
}

