"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { LogIn, UserPlus, User, ChevronDown } from "lucide-react"
import Image from "next/image"
import UserProfileDialog from "@/src/components/UserProfile/UserProfileDialog"

interface ExplorerHeaderProps {
  walletAddress: string | null
  connectWallet: () => void
  disconnectWallet: () => void
}

export default function ExplorerHeader({ walletAddress, connectWallet, disconnectWallet }: ExplorerHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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
            <Input type="search" placeholder="Search NFTs" className="cosmic-input w-64" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 gap-2 text-white bg-gradient-to-r from-cosmic-mint to-cosmic-purple hover:from-cosmic-purple hover:to-cosmic-mint transition-all duration-300 rounded-full shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-cosmic-mint/10 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {walletAddress ? truncateAddress(walletAddress) : "Guest User"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-80" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900/95 border border-cosmic-mint/20 backdrop-blur-md"
              >
                <DropdownMenuLabel className="text-cosmic-mint">Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-cosmic-mint/20" />
                {!walletAddress ? (
                  <>
                    <DropdownMenuItem className="group cursor-pointer text-gray-200 focus:bg-cosmic-mint/10 focus:text-cosmic-mint">
                      <LogIn className="mr-2 h-4 w-4 text-cosmic-mint group-hover:animate-pulse" />
                      <span>Log In</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group cursor-pointer text-gray-200 focus:bg-cosmic-mint/10 focus:text-cosmic-mint">
                      <UserPlus className="mr-2 h-4 w-4 text-cosmic-mint group-hover:animate-pulse" />
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-cosmic-mint/20" />
                    <DropdownMenuItem
                      onClick={connectWallet}
                      className="group cursor-pointer text-gray-200 focus:bg-cosmic-mint/10 focus:text-cosmic-mint"
                    >
                      <span className="text-sm text-cosmic-mint group-hover:animate-pulse">Connect Wallet</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => setIsProfileOpen(true)}
                      className="group cursor-pointer text-gray-200 focus:bg-cosmic-mint/10 focus:text-cosmic-mint"
                    >
                      <User className="mr-2 h-4 w-4 text-cosmic-mint group-hover:animate-pulse" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={disconnectWallet}
                      className="group cursor-pointer text-gray-200 focus:bg-cosmic-mint/10 focus:text-cosmic-mint"
                    >
                      <span className="text-sm text-rose-400 group-hover:animate-pulse">Disconnect Wallet</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <UserProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}

