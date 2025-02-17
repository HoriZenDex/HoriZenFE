import { Button } from "@/src/components/ui/button"
import { List } from "lucide-react"

interface NavbarCollapsedProps {
  setIsExpanded: () => void
}

export default function NavbarCollapsed({ setIsExpanded }: NavbarCollapsedProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-[#03ceb3] mt-2 bg-black/50 rounded-full p-2 absolute top-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#03ceb3] hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-[#03ceb3]/20 group"
      onClick={setIsExpanded}
    >
      <List className="h-5 w-5 transition-transform group-hover:scale-110" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#03ceb3] to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
    </Button>
  )
}

