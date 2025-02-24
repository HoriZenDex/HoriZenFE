"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Home, Heart, MessageCircle, Share2, Play, Star, Lock, Key, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { creators, type Creator } from "@/lib/data"

export default function CreatorProfile() {
  const { id } = useParams()
  const router = useRouter()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [activeTab, setActiveTab] = useState<"videos" | "images">("videos")

  useEffect(() => {
    const foundCreator = creators.find((c) => c.id === id)
    if (foundCreator) {
      setCreator(foundCreator)
    } else {
      // If creator is not found, redirect to home page
      router.push("/")
    }
  }, [id, router])

  if (!creator) {
    return <div>Loading...</div>
  }

  const filteredContent = creator.content.filter((item) => item.type === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90 text-white">
      <header className="p-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-cosmic-cyan hover:text-cosmic-cyan/80 transition-all duration-300"
          >
            <Home className="h-5 w-5" />
          </Button>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start mb-12">
          {/* Creator Info (Center) */}
          <div className="flex-1 flex flex-col items-center mb-8 md:mb-0">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-cosmic-cyan"
              />
            </div>
            <h1 className="text-3xl font-bold text-cosmic-cyan mb-2">{creator.name}</h1>
            <p className="text-sm text-cosmic-cyan mb-4">{creator.subscribers.toLocaleString()} subscribers</p>
            <Button className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group">
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            </Button>
          </div>

          {/* Bio and Limited Content (Right) */}
          <div className="md:w-1/3 space-y-6">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-cosmic-cyan mb-3">About</h2>
              <p className="text-sm text-gray-300">{creator.bio}</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-cosmic-cyan mb-3">Limited Content</h2>
              <ul className="space-y-3">
                {["Exclusive NFTs", "Behind-the-scenes", "Early access"].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Lock className="h-4 w-4 mr-2 text-cosmic-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-2 text-cosmic-cyan" />
                  <span className="text-sm font-medium">10/50 spots left</span>
                </div>
                <Button className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group">
                  <span className="relative z-10">Get Access</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs and Grid */}
        <div className="mb-8">
          <div className="flex justify-start space-x-4 mb-4">
            <Button
              onClick={() => setActiveTab("videos")}
              variant={activeTab === "videos" ? "default" : "outline"}
              className={`${
                activeTab === "videos"
                  ? "bg-[#03ceb3] text-gray-900 hover:bg-[#08fcdb] hover:text-black"
                  : "text-cosmic-cyan hover:text-cosmic-cyan/80"
              } font-semibold rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group`}
            >
              <span className="relative z-10">Videos</span>
              {activeTab === "videos" && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              )}
            </Button>
            <Button
              onClick={() => setActiveTab("images")}
              variant={activeTab === "images" ? "default" : "outline"}
              className={`${
                activeTab === "images"
                  ? "bg-[#03ceb3] text-gray-900 hover:bg-[#08fcdb] hover:text-black"
                  : "text-cosmic-cyan hover:text-cosmic-cyan/80"
              } font-semibold rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group`}
            >
              <span className="relative z-10">Images</span>
              {activeTab === "images" && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="bg-gray-900/50 border-gray-800/50 overflow-hidden">
                <CardContent className="p-3">
                  <div className="aspect-video relative mb-2">
                    <Image
                      src={item.thumbnail || item.url}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    {item.type === "videos" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-70" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-2 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {item.comments}
                      </span>
                      <span className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        {item.shares}
                      </span>
                    </div>
                    <span className="flex items-center text-cosmic-cyan">
                      <Star className="h-4 w-4 mr-1 fill-cosmic-cyan" />
                      4.9
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-cosmic-cyan" viewBox="0 0 320 512" fill="currentColor">
                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                      </svg>
                      <span className="text-cosmic-cyan font-semibold">{item.price}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold rounded-full px-4 py-1 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="relative z-10">Buy NFT</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

