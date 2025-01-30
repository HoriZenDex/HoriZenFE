import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-black/80 backdrop-blur-lg z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Videx
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/explore" className="text-sm text-gray-300 hover:text-secondary transition-colors">
              Explore
            </Link>
            <Link href="/create" className="text-sm text-gray-300 hover:text-secondary transition-colors">
              Create
            </Link>
            <Link href="/trade" className="text-sm text-gray-300 hover:text-secondary transition-colors">
              Trade
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}

