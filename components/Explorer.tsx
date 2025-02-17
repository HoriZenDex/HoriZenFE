"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const videoNFTs = [
  {
    id: 1,
    title: "Excited Jonah Hill",
    creator: "GIFmaster",
    price: "0.5 ETH",
    likes: 1200,
    url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGxrMW84bTVvYzd1d2V3amw1YWcyZjV4MWNlZXlkc2lzb2J1bHNqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x1XqoA5TxnrfW/giphy.gif",
  },
  {
    id: 2,
    title: "Confused Math Lady",
    creator: "MemeCreator",
    price: "0.7 ETH",
    likes: 980,
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazAybDRzMzhxaTZtZzVpdWQxbjk0bHd4N3d0ejQ5MDl0cG12cnhuZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8BIbQCuf2vZdu/giphy.gif",
  },
  {
    id: 3,
    title: "Excited Kid",
    creator: "GIFenthusiast",
    price: "0.6 ETH",
    likes: 1500,
    url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExczV2MzFleXk3cWZza3B4dmxiZmRwbzkxb2VwaGxkd3JjbHBva3VjaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wHB67Zkr63UP7RWJsj/giphy.gif",
  },
  // ... add more video NFTs here if needed
]

export default function Explorer() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = () => {
    // This is a mock function. In a real app, you'd use a library like ethers.js or web3.js
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
    setWalletAddress(mockAddress)
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="w-1/3 flex flex-col">
      {/* Explorer Header */}
      <div className="p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Explorer</h2>
          {walletAddress ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-[#03ceb3] transition-colors"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-3 w-3" />
              <span className="text-xs">{truncateAddress(walletAddress)}</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-[#03ceb3] transition-colors"
              onClick={connectWallet}
            >
              <Wallet className="mr-2 h-3 w-3" />
              <span className="text-xs">Connect</span>
            </Button>
          )}
        </div>
        <Input type="search" placeholder="Search NFTs" className="w-full bg-gray-800 border-gray-700 text-white" />
      </div>

      {/* Explorer Content */}
      <Tabs defaultValue="images" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full flex bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
          <TabsTrigger
            value="images"
            className="flex-1 py-3 text-sm font-medium text-gray-200 border-b-2 border-transparent data-[state=active]:bg-gray-800 data-[state=active]:border-[#03ceb3] data-[state=active]:text-white transition-all hover:text-white hover:bg-gray-800/50"
          >
            Images
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="flex-1 py-3 text-sm font-medium text-gray-200 border-b-2 border-transparent data-[state=active]:bg-gray-800 data-[state=active]:border-[#03ceb3] data-[state=active]:text-white transition-all hover:text-white hover:bg-gray-800/50"
          >
            Videos
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="images" className="p-4 mt-0">
            <div className="space-y-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500">
                      Image Placeholder
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-white">NFT Example #{i + 1}</p>
                        <p className="text-sm text-gray-400">Creator Name</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-rose-500" />
                        <span className="text-sm text-gray-400">{Math.floor(Math.random() * 1000) + 100}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos" className="p-4 mt-0">
            <div className="space-y-6">
              {videoNFTs.map((nft, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500">
                      Video Placeholder
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium text-white">{nft.title}</p>
                        <p className="text-sm text-gray-400">{nft.creator}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-rose-500" />
                        <span className="text-sm text-gray-400">{nft.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

