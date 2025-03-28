"use client"

import { useState, useEffect, useRef } from "react"
import { Home, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { creators } from "@/lib/data"
import { ShareModal } from "@/components/ShareModal"

const zenContent = [
  {
    id: 1,
    title: "Cosmic Meditation",
    creatorId: "cosmicraft",
    likes: 1200,
    comments: 89,
    shares: 45,
    type: "video" as "video",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Digital Dreamscape",
    creatorId: "nebulaart",
    likes: 980,
    comments: 120,
    shares: 67,
    type: "image" as "image",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Quantum Relaxation",
    creatorId: "quantumvisions",
    likes: 1500,
    comments: 210,
    shares: 98,
    type: "image" as "image",
    url: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Ethereal Serenity",
    creatorId: "etherealmuse",
    likes: 2200,
    comments: 180,
    shares: 120,
    type: "image" as "image",
    url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Astral Journey",
    creatorId: "cryptocanvas",
    likes: 1800,
    comments: 150,
    shares: 85,
    type: "image" as "image",
    url: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1000&q=80",
  },
]

export default function ZenZone() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentContent = zenContent[currentIndex]

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % zenContent.length)
      }, 5000) // Change content every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (currentContent.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [currentContent, isPlaying])

  const nextContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % zenContent.length)
  }

  const prevContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + zenContent.length) % zenContent.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentCreator = creators.find((creator) => creator.id === currentContent.creatorId);

  const handleShareClick = () => {
    setShowShareModal(true)
  }


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90">
        <ShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        content={currentContent}
      />
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
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-cosmic-cyan mb-8 text-center">Zen Zone</h1>
          <div className="relative h-[60vh] overflow-hidden rounded-lg" onClick={() => setIsPlaying(!isPlaying)}>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {currentContent.type === "image" ? (
                  <Image
                    src={currentContent.url || "/placeholder.svg"}
                    alt={currentContent.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={currentContent.url}
                    poster={currentContent.thumbnail}
                    className="w-full h-full object-cover rounded-lg"
                    loop
                    muted
                    playsInline
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-cyan hover:text-white z-10 bg-black/30 hover:bg-cosmic-cyan/20 rounded-full p-2 transition-all duration-300 ease-in-out"
              onClick={prevContent}
            >
              <ChevronLeft className="h-8 w-8 transition-transform hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cosmic-cyan hover:text-white z-10 bg-black/30 hover:bg-cosmic-cyan/20 rounded-full p-2 transition-all duration-300 ease-in-out"
              onClick={nextContent}
            >
              <ChevronRight className="h-8 w-8 transition-transform hover:scale-110" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 text-cosmic-cyan hover:text-white z-10 bg-black/30 hover:bg-cosmic-cyan/20 rounded-full p-2 transition-all duration-300 ease-in-out"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 transition-transform hover:scale-110" />
              ) : (
                <Play className="h-6 w-6 transition-transform hover:scale-110" />
              )}
            </Button>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h2 className="text-2xl font-bold mb-2">{currentContent.title}</h2>
              <Link href={`/creator/${currentContent.creatorId}`}>
                <p className="text-sm text-cosmic-cyan hover:text-cosmic-cyan/80 transition-colors duration-300">
                  by {currentCreator?.name}
                </p>
              </Link>
            </div>
          </div>
          <Card className="bg-gray-900/50 border-gray-800/50 mt-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-rose-400 hover:text-rose-300">
                    <Heart className="h-5 w-5 mr-2" />
                    {currentContent.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {currentContent.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300"  onClick={handleShareClick}>
                    <Share2 className="h-5 w-5 mr-2" />
                    {currentContent.shares}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-cosmic-cyan mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {zenContent.map((content, index) => {
            const creator = creators.find((c) => c.id === content.creatorId)
            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800/50 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cosmic-cyan/20">
                  <CardContent className="p-3">
                    <div className="aspect-video relative mb-2">
                      <Image
                        src={content.type === "image" ? content.url : content.thumbnail ?? ""}
                        alt={content.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                      {content.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-70" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-white truncate">{content.title}</h3>
                    <Link href={`/creator/${content.creatorId}`}>
                      <p className="text-xs text-cosmic-cyan hover:text-cosmic-cyan/80 transition-colors duration-300">
                        {creator?.name}
                      </p>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

