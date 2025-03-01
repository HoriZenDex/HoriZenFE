import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"
import { Providers } from "./providers"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HoriZen",
  description: "NFT marketplace and video platform",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'