"use client"

import { Copy, Check, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: {
    url: string
    title: string
    type: "video" | "image"
    creatorId: string
  }
}

export function ShareModal({ open, onOpenChange, content }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/zen-zone/share/${content.url}`)
    }
  }, [content.url])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this ${content.type} from Zen Zone: ${content.title}`)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(content.title)}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodeURIComponent(`Zen Zone ${content.type}`)}&body=${encodeURIComponent(`${content.title}\n\n${shareUrl}`)}`,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent 
            className="sm:max-w-md bg-gray-900 border-cosmic-mint/20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <DialogHeader>
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <DialogTitle className="text-cosmic-cyan mb-4">Share {content.type}</DialogTitle>
                </motion.div>
              </DialogHeader>

              <motion.div 
                className="flex items-center space-x-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative flex-1">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="bg-gray-800 border-cosmic-mint/20 text-gray-300 pr-10"
                  />
                  <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="px-3 bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-gray-900"
                  disabled={!shareUrl}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring" }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div 
                className="mt-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-gray-300 mb-3">Share via</h3>
                <div className="grid grid-cols-4 gap-2">
                  {socialPlatforms.map((platform, index) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <div className="p-1"> {/* Added a small padding container */}
                        {platform.icon}
                      </div>
                      <span className="mt-1 text-xs text-gray-300">{platform.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}