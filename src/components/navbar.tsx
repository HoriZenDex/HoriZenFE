"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { scrollToElement } from "@/src/utils"
import { useState, useEffect } from "react"

export function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  return (
    <header
      className={`fixed top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Videx
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToElement("video-nft-gallery")}
              className="text-base font-semibold text-gray-700 hover:text-primary transition-colors duration-300 hover:drop-shadow-glow relative group"
            >
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            {["Create", "Trade"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-base font-semibold text-gray-700 hover:text-primary transition-colors duration-300 hover:drop-shadow-glow relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="text-base font-semibold text-gray-700 hover:text-primary transition-colors duration-300 hover:drop-shadow-glow"
          >
            Docs
          </Link>
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-glow text-base font-semibold px-6 py-2 rounded-full"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}

