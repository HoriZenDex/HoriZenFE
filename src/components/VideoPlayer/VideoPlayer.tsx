"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import NFTDisplay from "./NFTDisplay"
import NFTActions from "./NFTActions"
import { nftExamples } from "@/lib/data"

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
      <NFTDisplay nft={currentNFT} />
      <NFTActions nft={currentNFT} />
    </div>
  )
}

