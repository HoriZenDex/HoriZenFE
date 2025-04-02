"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

interface Creator {
  id: string
  rank: number
  name: string
  subscribers: number
  avatar: string
}

interface TrendingCreatorsProps {
  creators: Creator[]
}

export default function TrendingCreators({ creators }: TrendingCreatorsProps) {
  return (
    <div className="px-4 py-8 bg-gray-900/50">
      <h2 className="text-2xl font-bold text-cosmic-cyan mb-6">Top Creators</h2>
      <Card className="bg-black/60 border-cosmic-mint/20">
        <CardContent className="p-0">
          <div className="divide-y divide-cosmic-mint/10">
            {creators.map((creator, index) => (
              <div key={creator.rank} className="flex items-center p-4 hover:bg-cosmic-mint/5 transition-colors">
                <div className="w-8 text-lg font-bold text-cosmic-cyan">{creator.rank}</div>
                <CreatorContent creator={creator} isLinked={index < 2} />
                <button className="px-4 py-2 bg-cosmic-cyan text-black rounded-full text-sm font-bold hover:bg-cosmic-cyan/80 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreatorContent({ creator, isLinked }: { creator: Creator; isLinked: boolean }) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const content = (
    <>
      <div className="flex-shrink-0 mr-4 relative w-12 h-12">
        {!imageError ? (
          <Image
            src={creator.avatar || "/placeholder.svg"}
            alt={creator.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2 border-cosmic-mint/30"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full rounded-full border-2 border-cosmic-mint/30 bg-gray-700 flex items-center justify-center">
            <User className="w-6 h-6 text-cosmic-cyan" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white hover:text-cosmic-cyan transition-colors">{creator.name}</h3>
        <p className="text-sm text-gray-400">{creator.subscribers.toLocaleString()} subscribers</p>
      </div>
    </>
  )

  if (isLinked) {
    return (
      <Link href={`/creator/${creator.id}`} className="flex items-center flex-grow">
        {content}
      </Link>
    )
  }

  return <div className="flex items-center flex-grow">{content}</div>
}

