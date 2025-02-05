import { Navbar } from "@/src/components/navbar"
import { AnimatedRingBackground } from "@/src/components/animated-ring-background"
import { VideoNFTGallery } from "@/src/components/video-nft-gallery"
import { ScrollArrow } from "@/src/components/scroll-arrow"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <AnimatedRingBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center relative">
          <div className="w-full max-w-6xl backdrop-blur-md bg-white/70 p-16 rounded-3xl shadow-2xl">
            <h1 className="text-7xl font-extrabold mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                Video NFT
              </span>
              <br />
              <span className="text-black drop-shadow-glow">Decentralized Exchange</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl animate-fade-in-up">
              Watch, Own, Redefine unique video NFTs on a secure and scalable platform.
            </p>
          </div>
          <ScrollArrow targetId="video-nft-gallery" />
        </div>
        <div id="video-nft-gallery">
          <VideoNFTGallery />
        </div>
      </div>
    </main>
  )
}

