"use client"

import { useState } from "react"
import Explorer from "@/components/Explorer/Explorer"
import Navbar from "@/components/Navbar/Navbar"
import ExplorerHeader from "@/components/Explorer/ExplorerHeader"

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
    setWalletAddress(mockAddress)
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ExplorerHeader walletAddress={walletAddress} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
      <main className="flex-1 overflow-hidden">
        <Explorer walletAddress={walletAddress} />
      </main>
      <Navbar />
    </div>
  )
}

