import { Card, CardContent } from "@/src/components/ui/card"
import { Heart } from "lucide-react"
import Image from "next/image"
import type { NFT } from "@/lib/types"

const sampleInventoryNFTs: NFT[] = [
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
  // Add more sample NFTs as needed
]

export default function Inventory() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-black via-black/95 to-black/90 overflow-y-auto p-6">
      <h1 className="text-2xl font-bold text-cosmic-cyan mb-6">My Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleInventoryNFTs.map((nft) => (
          <Card key={nft.id} className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-3">
                <Image
                  src={nft.url || "/placeholder.svg"}
                  alt={nft.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-white">{nft.title}</p>
                  <p className="text-sm text-gray-400">{nft.creator}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span className="text-sm text-gray-400">{nft.likes}</span>
                </div>
              </div>
              <p className="text-cosmic-cyan mt-2">{nft.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

