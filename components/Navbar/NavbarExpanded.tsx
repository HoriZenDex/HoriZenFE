"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import UploadModal from "@/components/Navbar/UploadModal/UploadModal"

interface NavbarExpandedProps {
  setIsExpanded: () => void
}

export default function NavbarExpanded({ setIsExpanded }: NavbarExpandedProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const lastScrollY = useRef(0)
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }

      animationFrame.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        lastScrollY.current = currentScrollY
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  

  return (
    <>
      <div
        className="w-full h-full flex flex-col items-center justify-start relative"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Top bar with Upload and Zen Zone buttons */}
        <div className="w-full sticky top-0 z-10 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm py-4">
          <div className="flex justify-center space-x-4 w-full">
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-bold px-8 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center text-lg">
                <Upload className="h-6 w-6 mr-3 transition-transform group-hover:animate-bounce" />
                Upload
              </span>
            </Button>
            <Link href="/zen-zone">
              <Button className="bg-gradient-to-r from-[#9370db] to-[#03ceb3] hover:from-[#03ceb3] hover:to-[#9370db] text-white font-bold px-12 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#9370db]/50 relative overflow-hidden group">
                <span className="relative z-10 flex items-center text-lg">Zen Zone</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main expanded content */}
        <div className="flex flex-col items-center justify-between w-full h-full px-8 py-6 overflow-y-auto scrollbar-hide bg-gradient-to-b from-black/40 via-black/40 to-black/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl space-y-8">
            {/* Collapse button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                className={`text-[#03ceb3] bg-gradient-to-b from-black/60 to-black/40 rounded-full w-12 h-12 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#03ceb3] hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-[#03ceb3]/20 group flex items-center justify-center ${
                  isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={setIsExpanded}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translate(-50%, ${isVisible ? "-50%" : "-100%"})`,
                }}
              >
                <ChevronDown className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="absolute inset-[2px] rounded-full bg-gradient-to-r from-[#03ceb3] to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></span>
              </Button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="cosmic-card p-6 rounded-lg border-2 border-[#03ceb3]/30 hover:border-[#03ceb3]/50 transition-colors duration-300">
                <h3 className="font-semibold text-cosmic-cyan mb-3 text-xl">Recent Activity</h3>
                <p className="text-base text-gray-300">View your recent interactions and transactions</p>
              </div>
              <div className="cosmic-card p-6 rounded-lg border-2 border-[#03ceb3]/30 hover:border-[#03ceb3]/50 transition-colors duration-300">
                <h3 className="font-semibold text-cosmic-cyan mb-3 text-xl">Settings</h3>
                <p className="text-base text-gray-300">Customize your profile and preferences</p>
              </div>
            </div>

            {/* Info section */}
            <div className="mt-8 text-sm border-t border-cosmic-mint/20 pt-8">
              <div className="flex items-center mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Horizen2-pzkuPFBk7x9tcoJWPNPHEq5cIeQrHP.png"
                  alt="HoriZen Logo"
                  width={60}
                  height={60}
                  className="mr-4"
                />
                <h3 className="font-bold text-lg bg-gradient-to-r from-[#03ceb3] to-[#9370db] text-transparent bg-clip-text">
                  HoriZen
                </h3>
              </div>
              <p className="mb-2 text-gray-300">
                We are <strong>HoriZen</strong>: A Web3-powered NFT Video DEX where creators and users
                truly own their content. Born at the <em>Celestia Mammothom</em>, we're revolutionizing
                digital content ownership.
              </p>
              <p className="mb-2 text-gray-300">
                Unlock premium video NFTs, exclusive behind-the-scenes content, 360° experiences, and VIP
                creator access. Join our community of creators and collectors in the future of digital entertainment.
              </p>
              <Link
                href="https://horizendex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-gradient-to-r from-[#03ceb3] to-[#9370db] text-transparent bg-clip-text font-semibold hover:from-[#9370db] hover:to-[#03ceb3] transition-all duration-300"
              >
                Learn More
              </Link>

              {/* "Powered by" section */}
              <div className="flex items-center gap-4 mt-4 mb-4">
                <span className="text-gray-400 text-sm">Powered by:</span>
                <Link
                  href="https://x.com/gelatonetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-furGnyRESy9GLMCICrNLu9STzlCbX5.png"
                    alt="Gelato Network"
                    width={24}
                    height={24}
                  />
                  <span className="text-[#FF4067] font-semibold text-sm">Gelato</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Global styles */}
        <style jsx global>{`
          :root {
            scroll-behavior: smooth;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </>
  )
}