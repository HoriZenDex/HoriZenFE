import { ChevronDown } from "lucide-react"

interface ScrollArrowProps {
  targetId: string
}

export function ScrollArrow({ targetId }: ScrollArrowProps) {
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={scrollToTarget}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      aria-label="Scroll to gallery"
    >
      <ChevronDown size={48} className="text-primary" />
    </button>
  )
}

