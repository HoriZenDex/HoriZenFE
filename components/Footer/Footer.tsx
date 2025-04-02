"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-cosmic-mint/10">
      <div className="w-full px-16 py-16">
        <div className="grid grid-cols-4 gap-24">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Horizen2-pzkuPFBk7x9tcoJWPNPHEq5cIeQrHP.png"
                alt="HoriZen Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-xl font-bold bg-gradient-to-r from-cosmic-mint to-cosmic-purple bg-clip-text text-transparent">
                HoriZen
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              We are HoriZen: A Web3-powered NFT Video DEX where creators and users truly own their content. Born at the
              Celestia Mammothon, we're revolutionizing digital content ownership.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Unlock premium video NFTs, exclusive behind-the-scenes content, 360° experiences, and VIP creator access.
              Join our community of creators and collectors in the future of digital entertainment.
            </p>
            <div className="flex items-center gap-4 mb-4">
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
            <Link
              href="https://www.gelato.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-cosmic-cyan hover:text-cosmic-mint transition-colors duration-300 text-sm font-medium"
            >
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Zen Zone", href: "/zen-zone" },
                { name: "About Us", href: "/about" },
                { name: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-cosmic-cyan transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
              <h4 className="text-white font-medium mb-4 text-sm">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/HoriZenOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cosmic-cyan transition-colors duration-300"
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link
                  href="https://github.com/HoriZenDex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cosmic-cyan transition-colors duration-300"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://www.linkedin.com/company/horizendex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmic-cyan transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
            </div>
          </div>

          {/* Stay Updated */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cosmic-cyan"
              />
              <Button className="bg-cosmic-cyan hover:bg-cosmic-mint text-black font-medium rounded-l-none rounded-r-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-6 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} HoriZen. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-cosmic-cyan text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-cosmic-cyan text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-cosmic-cyan text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

