"use client"

import { useState, useEffect } from "react"
import Explorer from "@/components/Explorer/Explorer"
import Navbar from "@/components/Navbar/Navbar"
import ExplorerHeader from "@/components/Explorer/ExplorerHeader"
import TrendingCreators from "@/components/TrendingCreators/TrendingCreators"
import TrendingCategories from "@/components/TrendingCategories/TrendingCategories"
import ZenZoneButton from "@/components/ZenZoneButton/ZenZoneButton"
import Footer from "@/components/Footer/Footer" 
import { trendingCreators } from "@/lib/data"
import { useNFTMetadata } from "@/hooks/use-nft-metadata"
import { NFT } from "@/lib/types"

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([])
  const [filteredCreators, setFilteredCreators] = useState(trendingCreators)
  const NFT_CONTRACT_ADDRESS = '0xFA80681DB103161D591035e9fE944f204c46bdFF'

  const connectWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
    setWalletAddress(mockAddress)
  }
  const { 
    mergedNFTs,
    fetchPinataData, 
    result,
    dataLoaded,
    isLoading,
  } = useNFTMetadata({
    contractAddress: NFT_CONTRACT_ADDRESS,
  })

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  useEffect(() => {
    if (result.data && !isLoading && !dataLoaded) {
      fetchPinataData();
    }
  });

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
        <Explorer walletAddress={walletAddress} nfts={mergedNFTs} />
        <TrendingCreators creators={trendingCreators.slice(0, 5)} />
        <Footer />
      </main>
      <Navbar />
    </div>
  )
}

