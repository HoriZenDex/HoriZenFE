"use client"

import type React from "react"
import { useState } from "react"
import type { NFT } from "@/src/lib/types"
import { Button } from "@/src/components/ui/button"
import {
  Heart,
  MessageCircle,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ViewIcon as View360,
} from "lucide-react"
import Image from "next/image"
import { bonusFeatures, keyBenefit } from "@/src/lib/data"

interface NFTDetailsProps {
  nft: NFT
  onClose: () => void
  onNavigate: (direction: "prev" | "next") => void
}

export default function NFTDetails({ nft, onClose, onNavigate }: NFTDetailsProps) {
  const [isBonusHovered, setIsBonusHovered] = useState(false)
  const [isKeyHovered, setIsKeyHovered] = useState(false)

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center pb-16"
      onClick={handleOutsideClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        onClick={onClose}
      >
        <X className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-cyan hover:text-white z-10 bg-black/30 hover:bg-cosmic-cyan/20 rounded-full p-2 transition-all duration-300 ease-in-out"
        onClick={() => onNavigate("prev")}
      >
        <ChevronLeft className="h-12 w-12 transition-transform hover:scale-110" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cosmic-cyan hover:text-white z-10 bg-black/30 hover:bg-cosmic-cyan/20 rounded-full p-2 transition-all duration-300 ease-in-out"
        onClick={() => onNavigate("next")}
      >
        <ChevronRight className="h-12 w-12 transition-transform hover:scale-110" />
      </Button>
      <div
        className="bg-gray-900 rounded-lg w-full max-w-7xl h-[calc(100vh-6rem)] max-h-[90vh] flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            {nft.type === "image" ? (
              <Image
                src={nft.url || "/placeholder.svg"}
                alt={nft.title}
                layout="fill"
                objectFit="cover"
                className="rounded-l-lg"
              />
            ) : (
              <video
                src={nft.url || "/placeholder.mp4"}
                className="w-full h-full object-cover rounded-l-lg"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
            {nft.is360 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#03ceb3] to-[#9370db] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 backdrop-blur-sm bg-opacity-70">
                <View360 className="w-4 h-4" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">360°</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 flex flex-col bg-gray-800 rounded-r-lg overflow-y-auto">
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{nft.title}</h2>
                <p className="text-lg text-gray-400">by {nft.creator}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <div className="mb-6">
              <h3 className="text-base font-medium text-amber-400 mb-2">Bonus Features</h3>
              <div className="flex flex-wrap gap-2">
                {bonusFeatures.slice(0, nft.bonusFeatures).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-amber-900/20 text-amber-300 px-2 py-1 rounded-full text-xs border border-amber-700/30 transition-all duration-300 hover:bg-amber-800/30 hover:border-amber-600/40"
                  >
                    {feature.title}
                  </span>
                ))}
              </div>
            </div>
            {nft.hasKeyBenefit && (
              <div className="bg-violet-900/40 border border-violet-500/40 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-violet-300 mb-2">{keyBenefit.title}</h4>
                <p className="text-gray-200 text-sm">{keyBenefit.description}</p>
              </div>
            )}
          </div>
          <div className="border-t border-gray-700 p-4 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-rose-400 hover:text-rose-300 transition-all duration-300 rounded-full p-2 hover:bg-rose-500/10 group relative overflow-hidden bg-black/50"
                  >
                    <Heart className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon" />
                  </Button>
                  <span className="text-rose-400 text-xs mt-1 font-mono">{nft.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-sky-400 hover:text-sky-300 transition-all duration-300 rounded-full p-2 hover:bg-sky-500/10 group relative overflow-hidden bg-black/50"
                  >
                    <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon" />
                  </Button>
                  <span className="text-sky-400 text-xs mt-1 font-mono">{nft.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 rounded-full p-2 hover:bg-emerald-500/10 group relative overflow-hidden bg-black/50"
                  >
                    <Share2 className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon" />
                  </Button>
                  <span className="text-emerald-400 text-xs mt-1 font-mono">{nft.shares}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-cosmic-cyan mb-2">{nft.price}</span>
                <Button className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-bold px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center text-sm">
                    <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:animate-bounce" />
                    Buy Now
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

