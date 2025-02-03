import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Videx - Video NFT DEX",
  description: "A decentralized exchange for Video NFTs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-white text-black antialiased")}>{children}</body>
    </html>
  )
}

