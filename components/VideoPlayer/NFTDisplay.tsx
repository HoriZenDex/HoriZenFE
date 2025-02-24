import { ViewIcon as View360 } from "lucide-react"
import type { NFT } from "@/lib/types"

export default function NFTDisplay({ nft }: { nft: NFT }) {
  return (
    <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
      <img src={nft.url || "/placeholder.svg"} alt={nft.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
        {nft.type === "video" ? "Video" : "Image"} NFT Placeholder
        {nft.is360 && (
          <span className="absolute top-4 right-4 bg-purple-500/5 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/10 border border-purple-300/10 shadow-lg shadow-purple-500/10 overflow-hidden group">
            <View360 className="w-4 h-4 mr-2 text-[#03ceb3] group-hover:animate-pulse" />
            <span className="bg-gradient-to-r from-[#03ceb3] via-purple-400 to-[#03ceb3] bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent font-bold">
              360°
            </span>
          </span>
        )}
      </div>
      <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white mb-2">{nft.title}</span>
          <span className="text-xl text-gray-300 mb-1">by {nft.creator}</span>
          <span className="text-lg text-[#08fcdb]">{nft.price}</span>
          <span className="text-sm text-gray-400 mt-2">{nft.type === "video" ? "Video NFT" : "Image NFT"}</span>
        </div>
      </div>
    </div>
  )
}
;<style jsx>{`
  @keyframes gradient-x {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .animate-gradient-x {
    animation: gradient-x 3s linear infinite;
  }
`}</style>

