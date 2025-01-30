import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { AnimatedRingBackground } from "@/components/animated-ring-background"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <AnimatedRingBackground />
      <div className="relative z-10">
        <Navbar />
        <section className="container pt-32 pb-20">
          <div className="max-w-3xl backdrop-blur-lg bg-black/50 p-12 rounded-2xl shadow-2xl">
            <h1 className="text-7xl font-extrabold mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                Video NFT
              </span>
              <br />
              <span className="text-white drop-shadow-glow">Decentralized Exchange</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl animate-fade-in-up">
              Trade, create, and collect unique video NFTs on a secure and scalable platform.
            </p>
            <div className="flex gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-black text-lg font-bold py-6 px-10 rounded-full hover:scale-105 hover:shadow-glow transition-all duration-300 animate-fade-in-up"
              >
                Start Trading
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary text-lg font-bold py-6 px-10 rounded-full hover:bg-primary hover:text-black hover:scale-105 hover:shadow-glow transition-all duration-300 animate-fade-in-up"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

