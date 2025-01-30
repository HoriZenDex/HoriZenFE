import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/particles-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <div className="absolute inset-0">
        <ParticlesBackground />
      </div>
      <section className="container relative pt-32 pb-20 z-10">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Video NFT</span>
            <br />
            <span className="text-white">Decentralized Exchange</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            Trade, create, and collect unique video NFTs on a secure and scalable platform.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-black hover:opacity-90 transition-all duration-300"
            >
              Start Trading
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

