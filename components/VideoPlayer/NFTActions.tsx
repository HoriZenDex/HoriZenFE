import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react"
import BonusFeaturesDialog from "./BonusFeaturesDialog"
import KeyBenefitDialog from "./KeyBenefitDialog"
import type { NFT } from "@/lib/types"

export default function NFTActions({ nft }: { nft: NFT }) {
  return (
    <div className="mt-6 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        {[
          { icon: Heart, color: "rose", count: nft.likes },
          { icon: MessageCircle, color: "sky", count: nft.comments },
          { icon: Share2, color: "emerald", count: nft.shares },
        ].map(({ icon: Icon, color, count }, index) => (
          <div key={index} className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`text-${color}-400 hover:text-${color}-300 transition-all duration-300 rounded-full p-3 hover:bg-${color}-500/10 group relative overflow-hidden bg-black/50 ${index === 0 ? "w-16 h-16" : "w-14 h-14"}`}
            >
              <Icon
                className={`${index === 0 ? "h-10 w-10" : "h-8 w-8"} transition-transform group-hover:scale-125 relative z-10 smooth-icon neon-glow-${color}`}
              />
            </Button>
            <div
              className={`text-sm mt-2 font-mono ${
                index === 0
                  ? "text-rose-400 neon-text-rose"
                  : index === 1
                    ? "text-sky-400 neon-text-sky"
                    : "text-emerald-400 neon-text-emerald"
              }`}
            >
              {count}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <BonusFeaturesDialog bonusFeatures={nft.bonusFeatures} />
        {nft.hasKeyBenefit && <KeyBenefitDialog />}
        <Button className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-bold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group">
          <span className="relative z-10 flex items-center text-lg">
            <ShoppingCart className="h-5 w-5 mr-2 transition-transform group-hover:animate-bounce" />
            Buy Now
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
        </Button>
      </div>
    </div>
  )
}

