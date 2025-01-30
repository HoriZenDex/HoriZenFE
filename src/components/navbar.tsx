import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-black/80 backdrop-blur-lg z-50">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Videx
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {["Explore", "Create", "Trade"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-base font-semibold text-gray-300 hover:text-secondary transition-colors duration-300 hover:drop-shadow-glow relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-glow text-base font-semibold px-6 py-2 rounded-full"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}

