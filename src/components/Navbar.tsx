"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { ChevronDown, List, Upload } from "lucide-react"

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 to-black/95 backdrop-blur-md transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? "h-[280px]" : "h-16"
      } flex flex-col items-center border-t border-gray-800/50`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-[#08fcdb] hover:text-[#3afde2] mt-2 bg-gray-900/50 rounded-full p-2 absolute top-2 left-1/2 transform -translate-x-1/2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </Button>

      {isExpanded && (
        <div className="w-full max-w-screen-xl px-4 mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 mr-4">
              <Input
                type="search"
                placeholder="Search Horiz3n"
                className="w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-semibold rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#03ceb3]/50 relative overflow-hidden group"
              >
                <Upload className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Upload</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#03ceb3] to-[#08fcdb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Horiz3n" />
                <AvatarFallback className="bg-black flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M50 5
                        C 70 5, 87 20, 95 40
                        C 98 50, 98 60, 95 70
                        C 90 85, 75 95, 60 95
                        C 45 95, 25 90, 15 75
                        C 5 60, 5 40, 15 25
                        C 25 10, 40 5, 50 5
                        M 95 40
                        C 90 30, 85 25, 75 20"
                      stroke="#08fcdb"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-[#03ceb3]/10 hover:border-[#03ceb3]/30 transition-colors">
              <h3 className="font-semibold text-[#08fcdb] mb-2">Recent Activity</h3>
              <p className="text-sm text-gray-300">View your recent interactions and transactions</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-[#03ceb3]/10 hover:border-[#03ceb3]/30 transition-colors">
              <h3 className="font-semibold text-[#08fcdb] mb-2">Settings</h3>
              <p className="text-sm text-gray-300">Customize your profile and preferences</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

