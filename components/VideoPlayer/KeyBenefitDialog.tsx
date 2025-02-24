"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Key } from "lucide-react"
import { keyBenefit } from "@/lib/data"

export default function KeyBenefitDialog() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center relative group">
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/80 border border-cosmic-mint/20 rounded-md text-cosmic-cyan text-sm transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h3 className="font-semibold mb-1">{keyBenefit.title}</h3>
        <p className="text-xs text-gray-300">{keyBenefit.description}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-violet-400 hover:text-violet-300 transition-all duration-300 rounded-full p-2 hover:bg-violet-500/10 relative overflow-hidden bg-black/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Key className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon neon-glow-violet" />
      </Button>
      <div className="text-violet-400 text-xs mt-1 font-mono neon-text-violet">Key</div>
    </div>
  )
}

