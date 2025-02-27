"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [bonusFile, setBonusFile] = useState<File | null>(null)
  const [isBonusEnabled, setIsBonusEnabled] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleBonusFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBonusFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle upload logic here
    console.log({ file, title, description, duration, bonusFile, isBonusEnabled })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1218] border-cosmic-mint/20 p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-white">Upload Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="bg-[#1a1f2a] border-gray-700 text-white placeholder:text-gray-400 focus:border-cosmic-cyan/50 focus:ring-cosmic-cyan/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="min-h-[100px] bg-[#1a1f2a] border-gray-700 text-white placeholder:text-gray-400 focus:border-cosmic-cyan/50 focus:ring-cosmic-cyan/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-white">
              Duration (mm:ss)
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter video duration"
              className="bg-[#1a1f2a] border-gray-700 text-white placeholder:text-gray-400 focus:border-cosmic-cyan/50 focus:ring-cosmic-cyan/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video" className="text-white">
              Video File
            </Label>
            <div className="relative">
              <Input id="video" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => document.getElementById("video")?.click()}
                  variant="outline"
                  className="w-full bg-[#1a1f2a] border-gray-700 text-white hover:bg-[#2a3142] hover:text-cosmic-cyan transition-all duration-300"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <span className="text-gray-400 text-sm">{file ? file.name : "No file chosen"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBonusEnabled(!isBonusEnabled)}
            >
              <input
                type="checkbox"
                id="bonusOption"
                checked={isBonusEnabled}
                onChange={(e) => setIsBonusEnabled(e.target.checked)}
                className="sr-only"
              />
              <motion.div
                className={`w-14 h-7 flex items-center rounded-full p-1 ${
                  isBonusEnabled ? "bg-cosmic-cyan" : "bg-gray-700"
                }`}
                animate={{ backgroundColor: isBonusEnabled ? "#03ceb3" : "#374151" }}
              >
                <motion.div
                  className="bg-white w-5 h-5 rounded-full shadow-md"
                  animate={{ x: isBonusEnabled ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.div>
              <Label
                htmlFor="bonusOption"
                className="flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-cosmic-cyan to-purple-500 text-transparent bg-clip-text cursor-pointer"
              >
                <Sparkles className="h-5 w-5 text-cosmic-cyan animate-pulse" />
                <span className="transition-all duration-300">Enable Bonus Feature</span>
              </Label>
            </motion.div>

            {isBonusEnabled && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="bonusFile" className="text-white">
                  Bonus Content (Video/Image)
                </Label>
                <div className="relative">
                  <Input
                    id="bonusFile"
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleBonusFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => document.getElementById("bonusFile")?.click()}
                      variant="outline"
                      className="w-full bg-[#1a1f2a] border-gray-700 text-white hover:bg-[#2a3142] hover:text-cosmic-cyan transition-all duration-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Bonus File
                    </Button>
                    <span className="text-gray-400 text-sm">{bonusFile ? bonusFile.name : "No file chosen"}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-cosmic-cyan hover:bg-[#08fcdb] text-black font-semibold py-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cosmic-cyan/20"
            >
              Upload Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

