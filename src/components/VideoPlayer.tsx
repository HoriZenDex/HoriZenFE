"use client"

import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { ChevronDown, ChevronUp, Heart, MessageCircle, Share2, Trophy, Key, ViewIcon as View360 } from "lucide-react"
import { useState, useMemo } from "react"

type NFTType = "image" | "video"

interface NFT {
  id: number
  title: string
  creator: string
  price: string
  type: NFTType
  likes: number
  comments: number
  shares: number
  bonusFeatures: number
  hasKeyBenefit: boolean
  url: string
  is360: boolean
}

const nftExamples: NFT[] = [
  {
    id: 1,
    title: "Cosmic Voyage",
    creator: "StarGazer",
    price: "0.5 ETH",
    type: "image",
    likes: 1200,
    comments: 89,
    shares: 45,
    bonusFeatures: 2,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
  {
    id: 2,
    title: "Digital Dreams",
    creator: "CyberArtist",
    price: "0.7 ETH",
    type: "video",
    likes: 980,
    comments: 120,
    shares: 67,
    bonusFeatures: 1,
    hasKeyBenefit: false,
    url: "/placeholder.svg?height=400&width=600",
    is360: false,
  },
  {
    id: 3,
    title: "Neon Nights",
    creator: "GlowMaster",
    price: "0.6 ETH",
    type: "image",
    likes: 1500,
    comments: 210,
    shares: 98,
    bonusFeatures: 2,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: false,
  },
  {
    id: 4,
    title: "Quantum Quasar",
    creator: "SpaceWizard",
    price: "0.8 ETH",
    type: "video",
    likes: 2200,
    comments: 180,
    shares: 120,
    bonusFeatures: 3,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
]

const bonusFeatures = [
  { title: "Exclusive Access", description: "Gain early access to new NFT drops and collections." },
  { title: "Community Perks", description: "Enjoy special benefits and rewards within our community." },
  { title: "Creator Interaction", description: "Direct communication channel with the NFT creator." },
  { title: "360° Image Viewing", description: "Immersive 360° viewing experience for image NFTs.", icon: View360 },
  {
    title: "360° Video Playback",
    description: "Full 360° video playback support for an immersive experience.",
    icon: View360,
  },
]

const keyBenefit = { title: "Lifetime Membership", description: "Enjoy exclusive benefits for life as a key holder." }

export default function VideoPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentNFT = useMemo(() => nftExamples[currentIndex], [currentIndex])

  const handlePrevious = () => setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : nftExamples.length - 1))
  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex < nftExamples.length - 1 ? prevIndex + 1 : 0))

  return (
    <div className="w-full flex flex-col p-4 border-r border-gray-800 relative pb-24">
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col-reverse items-center justify-center gap-6 z-[5]">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-900/50 text-teal-400 hover:text-teal-300 rounded-full w-14 h-14 transition-all duration-300 ease-in-out hover:bg-teal-500/10 hover:scale-110 group relative overflow-hidden"
          onClick={handleNext}
        >
          <ChevronDown className="h-8 w-8 transition-transform duration-300 ease-in-out group-hover:translate-y-1 group-hover:scale-125 smooth-icon" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-900/50 text-teal-400 hover:text-teal-300 rounded-full w-14 h-14 transition-all duration-300 ease-in-out hover:bg-teal-500/10 hover:scale-110 group relative overflow-hidden"
          onClick={handlePrevious}
        >
          <ChevronUp className="h-8 w-8 transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-125 smooth-icon" />
        </Button>
      </div>
      <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
        <img src={currentNFT.url || "/placeholder.svg"} alt={currentNFT.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          {currentNFT.type === "video" ? "Video" : "Image"} NFT Placeholder
          {currentNFT.is360 && (
            <span className="absolute top-4 right-4 bg-[#03ceb3] text-black px-2 py-1 rounded-full text-sm font-semibold flex items-center">
              <View360 className="w-4 h-4 mr-1" />
              360°
            </span>
          )}
        </div>
        <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white mb-2">{currentNFT.title}</span>
            <span className="text-xl text-gray-300 mb-1">by {currentNFT.creator}</span>
            <span className="text-lg text-[#08fcdb]">{currentNFT.price}</span>
            <span className="text-sm text-gray-400 mt-2">
              {currentNFT.type === "video" ? "Video NFT" : "Image NFT"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {[
            { icon: Heart, color: "rose", count: currentNFT.likes },
            { icon: MessageCircle, color: "sky", count: currentNFT.comments },
            { icon: Share2, color: "emerald", count: currentNFT.shares },
          ].map(({ icon: Icon, color, count }, index) => (
            <div key={index} className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className={`text-${color}-400 hover:text-${color}-300 transition-all duration-300 rounded-full p-2 hover:bg-${color}-500/10 group relative overflow-hidden bg-gray-800/50 ${index === 0 ? "w-14 h-14" : ""}`}
              >
                <Icon
                  className={`${index === 0 ? "h-8 w-8" : "h-6 w-6"} transition-transform group-hover:scale-125 relative z-10 smooth-icon`}
                />
              </Button>
              <div className={`${index === 0 ? "bg-gray-700 rounded-full px-2 py-1" : ""} text-gray-400 text-xs mt-1`}>
                {count}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-400 hover:text-amber-300 transition-all duration-300 rounded-full p-2 hover:bg-amber-500/10 group relative overflow-hidden bg-gray-800/50"
                >
                  <Trophy className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-gradient-to-br from-gray-900 to-black border-[#03ceb3]/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#08fcdb] to-[#03ceb3]">
                    Bonus Features
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {bonusFeatures.slice(0, currentNFT.bonusFeatures).map((feature) => (
                    <div
                      key={feature.title}
                      className="p-4 rounded-lg bg-black/50 border border-[#03ceb3]/10 hover:border-[#03ceb3]/30 transition-colors group"
                    >
                      <h3 className="font-semibold text-[#08fcdb] mb-2 group-hover:text-[#3afde2] transition-colors flex items-center">
                        {feature.icon && <feature.icon className="w-5 h-5 mr-2" />}
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <div className="text-gray-400 text-xs mt-1 font-mono">x{currentNFT.bonusFeatures}</div>
          </div>
          {currentNFT.hasKeyBenefit && (
            <div className="flex flex-col items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-violet-400 hover:text-violet-300 transition-all duration-300 rounded-full p-2 hover:bg-violet-500/10 group relative overflow-hidden bg-gray-800/50"
                  >
                    <Key className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-gradient-to-br from-gray-900 to-black border-[#03ceb3]/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#08fcdb] to-[#03ceb3]">
                      Key Holder Benefit
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-6">
                    <div className="p-4 rounded-lg bg-black/50 border border-[#03ceb3]/10 hover:border-[#03ceb3]/30 transition-colors group">
                      <h3 className="font-semibold text-[#08fcdb] mb-2 group-hover:text-[#3afde2] transition-colors">
                        {keyBenefit.title}
                      </h3>
                      <p className="text-sm text-gray-400">{keyBenefit.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="text-gray-400 text-xs mt-1 font-mono">Key</div>
            </div>
          )}
        </div>
        <Button className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group">
          <span className="relative z-10">Buy Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"></span>
        </Button>
      </div>
      <style jsx global>{`
        .smooth-icon {
          filter: drop-shadow(0 0 1px currentColor);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .smooth-icon:hover {
          filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 4px currentColor);
        }
      `}</style>
    </div>
  )
}

