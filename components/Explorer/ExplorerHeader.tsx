"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Wallet } from "lucide-react"
import Image from "next/image"
import UserProfileDialog from "@/components/UserProfile/UserProfileDialog"
import { WalletOptions } from "../WalletOptions"
import { Account } from "../account"
import { useAccount, useConnect } from "wagmi"

interface ExplorerHeaderProps {
  walletAddress: string | null
  connectWallet: () => void
  disconnectWallet: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

function ConnectWallet() {
  const { isConnected } = useAccount()
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  
  if (isConnected) {
    return <Account />
  }
  
  return (
    <div className="relative">
      <Button
        className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full px-4 py-2 flex items-center space-x-2"
        onClick={() => setShowWalletOptions(true)}
      >
        <Wallet className="h-4 w-4 mr-2" />
        <span>Connect Wallet</span>
      </Button>
      
      {showWalletOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowWalletOptions(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Connect your wallet</h2>
            <p className="text-gray-400 mb-6">Select a wallet to connect to HoriZenDex</p>
            <div className="space-y-3">
              <WalletModalContent onClose={() => setShowWalletOptions(false)} />
            </div>
            <p className="text-xs text-gray-500 mt-6">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// This is a wrapper component that directly uses the wallet connectors
function WalletModalContent({ onClose }) {
  const { connect, connectors } = useConnect()
  
  return (
    <>
      {connectors.map((connector) => (
        <button 
          key={connector.id}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center gap-3 transition-colors border border-gray-700"
          onClick={() => {
            connect({ connector })
            onClose()
          }}
        >
          <span className="text-cyan-400">
            <Wallet className="h-5 w-5" />
          </span>
          <span>{connector.name}</span>
        </button>
      ))}
    </>
  )
}

export default function ExplorerHeader({
  walletAddress,
  connectWallet,
  disconnectWallet,
  searchTerm,
  setSearchTerm,
}: ExplorerHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div className="p-4 bg-black/60 border-b border-cosmic-mint/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Horizen2-pzkuPFBk7x9tcoJWPNPHEq5cIeQrHP.png"
              alt="HoriZen Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="text-xl font-bold bg-gradient-to-r from-cosmic-mint to-cosmic-purple bg-clip-text text-transparent">
              HoriZen
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search NFTs and Creators"
                className="cosmic-input w-64 pl-10 text-white"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>

      <UserProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}