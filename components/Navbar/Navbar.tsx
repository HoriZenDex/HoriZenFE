"use client"

import { useState } from "react"
import NavbarExpanded from "./NavbarExpanded"
import NavbarCollapsed from "./NavbarCollapsed"

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleNavbar = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-cosmic-mint/5 backdrop-blur-md transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? "h-[280px]" : "h-16"
      } flex flex-col items-center border-t border-cosmic-mint/20 overflow-hidden`}
    >
      {isExpanded ? (
        <div className="w-full h-full overflow-y-auto">
          <NavbarExpanded setIsExpanded={toggleNavbar} />
        </div>
      ) : (
        <NavbarCollapsed setIsExpanded={toggleNavbar} />
      )}
    </nav>
  )
}

