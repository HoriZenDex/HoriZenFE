"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ChevronDown } from "lucide-react"
import Image from "next/image"
import { nftExamples } from "@/lib/data"

interface UserProfileDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileDialog({ isOpen, onClose }: UserProfileDialogProps) {
  const userNFTs = nftExamples.filter((_, index) => index % 3 === 0)
  const [currentFilter, setCurrentFilter] = useState<"all" | "image" | "video">("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredNFTs = userNFTs.filter((nft) => currentFilter === "all" || nft.type === currentFilter)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-[1200px] bg-black/95 border-cosmic-mint/20 p-0 overflow-hidden">
        <div className="p-6 h-[80vh] flex flex-col">
          <h2 className="text-2xl font-bold text-cosmic-cyan mb-6">My Profile</h2>

          <Tabs defaultValue="inventory" className="flex-1 flex flex-col">
            <TabsList className="mb-6 bg-black/60 border border-cosmic-mint/20">
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-cosmic-mint/10 data-[state=active]:text-cosmic-cyan"
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="data-[state=active]:bg-cosmic-mint/10 data-[state=active]:text-cosmic-cyan"
              >
                Likes
              </TabsTrigger>
              <TabsTrigger
                value="shares"
                className="data-[state=active]:bg-cosmic-mint/10 data-[state=active]:text-cosmic-cyan"
              >
                Shares
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="flex-1 overflow-hidden h-[calc(80vh-120px)]">
              <div className="flex flex-col h-full">
                <div className="relative mb-4">
                  <div
                    className="w-full flex justify-center bg-black/60 border-b border-cosmic-mint/20 sticky top-0 z-10"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <button
                      className={`px-8 py-3 text-sm font-medium ${
                        currentFilter === "all"
                          ? "text-cosmic-cyan border-b-2 border-cosmic-cyan"
                          : "text-gray-200 hover:text-cosmic-mint"
                      }`}
                      onClick={() => setCurrentFilter("all")}
                    >
                      All
                    </button>
                    <button
                      className={`px-8 py-3 text-sm font-medium ${
                        currentFilter === "image"
                          ? "text-cosmic-cyan border-b-2 border-cosmic-cyan"
                          : "text-gray-200 hover:text-cosmic-mint"
                      }`}
                      onClick={() => setCurrentFilter("image")}
                    >
                      Images
                    </button>
                    <button
                      className={`px-8 py-3 text-sm font-medium ${
                        currentFilter === "video"
                          ? "text-cosmic-cyan border-b-2 border-cosmic-cyan"
                          : "text-gray-200 hover:text-cosmic-mint"
                      }`}
                      onClick={() => setCurrentFilter("video")}
                    >
                      Videos
                    </button>
                    <ChevronDown
                      className={`h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-cosmic-cyan transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-black/80 border-b border-cosmic-mint/20 p-4 z-20">
                      <div className="flex flex-wrap gap-2">
                        {["#NFT", "#Crypto", "#DigitalArt", "#Blockchain", "#Ethereum", "#Web3"].map((tag) => (
                          <span key={tag} className="bg-cosmic-mint/10 text-cosmic-cyan px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredNFTs.map((nft) => (
                      <Card key={nft.id} className="bg-gray-900/50 border-gray-800/50 overflow-hidden">
                        <CardContent className="p-3">
                          <div className="aspect-square relative mb-2">
                            <Image
                              src={nft.url || "/placeholder.svg"}
                              alt={nft.title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-white">{nft.title}</p>
                              <p className="text-xs text-gray-400">{nft.creator}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className="h-3 w-3 text-rose-500" />
                              <span className="text-xs text-gray-400">{nft.likes}</span>
                            </div>
                          </div>
                          <p className="text-cosmic-cyan text-xs mt-1">{nft.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="likes" className="flex items-center justify-center h-[calc(80vh-120px)]">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-center border border-[#03ceb3]/10">
                <p className="text-[#03ceb3] text-xl font-medium tracking-wide">
                  Likes in my NFT profile will be added soon.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="shares" className="flex items-center justify-center h-[calc(80vh-120px)]">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 text-center border border-[#03ceb3]/10">
                <p className="text-[#03ceb3] text-xl font-medium tracking-wide">
                  Shares in my NFT profile will be added soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

