import { Card, CardContent } from "@/src/components/ui/card"
import { Heart } from "lucide-react"
import { videoNFTs } from "@/src/lib/data"

export default function VideosTab() {
  return (
    <div className="space-y-6">
      {videoNFTs.map((nft, i) => (
        <Card key={i} className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="aspect-video bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500">
              Video Placeholder
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

