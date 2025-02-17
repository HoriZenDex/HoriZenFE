import { Card, CardContent } from "@/src/components/ui/card"
import { Heart } from "lucide-react"

export default function ImagesTab() {
  return (
    <div className="space-y-6">
      {[...Array(12)].map((_, i) => (
        <Card key={i} className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500">
              Image Placeholder
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-white">NFT Example #{i + 1}</p>
                <p className="text-sm text-gray-400">Creator Name</p>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="text-sm text-gray-400">{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

