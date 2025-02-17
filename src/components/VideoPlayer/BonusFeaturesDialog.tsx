"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { bonusFeatures } from "@/lib/data"

export default function BonusFeaturesDialog({ bonusFeatures: count }: { bonusFeatures: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center relative group">
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/80 border border-cosmic-mint/20 rounded-md text-cosmic-cyan text-sm transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h3 className="font-semibold mb-1">Bonus Features:</h3>
        <ul className="list-disc list-inside">
          {bonusFeatures.slice(0, count).map((feature) => (
            <li key={feature.title} className="text-xs text-gray-300">
              {feature.title}
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-amber-400 hover:text-amber-300 transition-all duration-300 rounded-full p-2 hover:bg-amber-500/10 relative overflow-hidden bg-black/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Trophy className="h-6 w-6 transition-transform group-hover:scale-125 relative z-10 smooth-icon neon-glow-amber" />
      </Button>
      <div className="text-amber-400 text-xs mt-1 font-mono neon-text-amber">x{count}</div>
    </div>
  )
}

