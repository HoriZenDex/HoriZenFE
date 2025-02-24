import Link from "next/link"

export default function ZenZoneButton() {
  return (
    <div className="w-full py-4 bg-gradient-to-b from-black to-gray-900/50">
      <div className="container mx-auto px-4">
        <Link href="/zen-zone">
          <button className="mx-auto block w-48 bg-gradient-to-r from-[#9370db]/10 to-[#03ceb3]/10 hover:from-[#9370db]/20 hover:to-[#03ceb3]/20 text-cosmic-cyan font-bold py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#9370db]/20 border border-cosmic-mint/20 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-[#9370db] to-[#03ceb3] text-transparent bg-clip-text text-lg">
              Zen Zone
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

