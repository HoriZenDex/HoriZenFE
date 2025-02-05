"use client"

import { ChevronDown } from "lucide-react"
import { scrollToElement } from "@/utils"

interface ScrollArrowProps {
  targetId: string
}

export function ScrollArrow({ targetId }: ScrollArrowProps) {
  return (
    <button
      onClick={() => scrollToElement(targetId)}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      aria-label="Scroll to gallery"
    >
      <ChevronDown size={48} className="text-primary" />
    </button>
  )
}

