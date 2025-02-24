"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImagesTab from "./ImagesTab"
import VideosTab from "./VideosTab"

export default function ExplorerTabs() {
  return (
    <Tabs defaultValue="images" className="flex-1 flex flex-col overflow-hidden">
      <TabsList className="w-full flex bg-black/60 border-b border-cosmic-mint/20 sticky top-0 z-10">
        <TabsTrigger
          value="images"
          className="flex-1 py-3 text-sm font-medium text-gray-200 border-b-2 border-transparent data-[state=active]:bg-black/40 data-[state=active]:border-cosmic-cyan data-[state=active]:text-cosmic-cyan transition-all hover:text-cosmic-mint hover:bg-black/20"
        >
          Images
        </TabsTrigger>
        <TabsTrigger
          value="videos"
          className="flex-1 py-3 text-sm font-medium text-gray-200 border-b-2 border-transparent data-[state=active]:bg-black/40 data-[state=active]:border-cosmic-cyan data-[state=active]:text-cosmic-cyan transition-all hover:text-cosmic-mint hover:bg-black/20"
        >
          Videos
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 overflow-y-auto">
        <TabsContent value="images" className="p-4 mt-0 overflow-y-auto h-full">
          <ImagesTab />
        </TabsContent>
        <TabsContent value="videos" className="p-4 mt-0 overflow-y-auto h-full">
          <VideosTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}

