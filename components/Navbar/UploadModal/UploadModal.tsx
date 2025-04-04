"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { nanoid } from 'nanoid'
import { pinata } from "@/utils/config"
import { useWriteContract } from "wagmi";
import { abi } from '@/VideoNFTMarketplace.json'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (tokenUris: { mainTokenUri: string; bonusTokenUri?: string }) => void
}

// Definimos la interfaz para la respuesta de Pinata
interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

interface NFTMetadata {
  id: string
  name: string
  description: string
  type: string
  image: string
}

export default function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [bonusFile, setBonusFile] = useState<File | null>(null)
  const [isBonusEnabled, setIsBonusEnabled] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { writeContract } = useWriteContract();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }, [])

  const handleBonusFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBonusFile(e.target.files[0])
    }
  }, [])

  const getFileType = (file: File): string => {
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("video/")) return "video"
    return "other"
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!file) {
        setError("Please select a file to upload")
        return
      }

      if (isBonusEnabled && !bonusFile) {
        setError("Please select a bonus file or disable the bonus feature")
        return
      }

      console.log("Starting upload process...");

      try {
        setIsUploading(true)
        setError(null)
        
        // 1. Upload the main content file to Pinata
        const contentUpload = await pinata.upload.file(file).addMetadata({
          name: title
        })
        // Get IPFS hash from the response
        const contentIpfsHash = contentUpload.IpfsHash
        const contentUrl = `${pinata.config?.pinataGateway}/ipfs/${contentIpfsHash}`
        
        // 2. Create main NFT metadata
        const mainMetadata: NFTMetadata = {
          id: nanoid(),
          name: title,
          description: description,
          type: getFileType(file),
          image: contentUrl
        }
        
        // 3. Upload main metadata to Pinata
        const mainMetadataFile = new File(
          [JSON.stringify(mainMetadata, null, 2)], 
          `${mainMetadata.id}.json`, 
          { type: "application/json" }
        )
        
        const mainMetadataUpload = await pinata.upload.file(mainMetadataFile).addMetadata({
          name: `${title} - Metadata`
        })
        
        // 4. Get the URI for minting the main NFT
        const mainMetadataIpfsHash = mainMetadataUpload.IpfsHash
        const mainTokenUri = `${pinata.config?.pinataGateway}/ipfs/${mainMetadataIpfsHash}`
        console.log("IFPSHash");
        console.log(mainMetadataIpfsHash);
        // Variables para el resultado final
        let bonusTokenUri: string | undefined = undefined;
        
        // 5. Process bonus content if enabled
        if (isBonusEnabled && bonusFile) {
          // Upload bonus file
          const bonusUpload = await pinata.upload.file(bonusFile).addMetadata({
            name: `${title} - Bonus`
          })
          const bonusIpfsHash = bonusUpload.IpfsHash
          const bonusUrl = `${pinata.config?.pinataGateway}/ipfs/${bonusIpfsHash}`
          
          // Create bonus NFT metadata
          const bonusMetadata: NFTMetadata = {
            id: nanoid(),
            name: `${title} - Bonus`,
            description: `Bonus content for ${title}`,
            type: getFileType(bonusFile),
            image: bonusUrl
          }
          
          // Upload bonus metadata
          const bonusMetadataFile = new File(
            [JSON.stringify(bonusMetadata, null, 2)], 
            `${bonusMetadata.id}.json`, 
            { type: "application/json" }
          )
          
          const bonusMetadataUpload = await pinata.upload.file(bonusMetadataFile).addMetadata({
            name: `${title} - Bonus Metadata`
          })
          
          // Get the URI for minting the bonus NFT
          const bonusMetadataIpfsHash = bonusMetadataUpload.IpfsHash
          bonusTokenUri = `${pinata.config?.pinataGateway}/ipfs/${bonusMetadataIpfsHash}`

          console.log("BonusIFPSHash");
          console.log(bonusMetadataIpfsHash);
        }


        
        console.log("Upload successful:", {
          mainTokenUri,
          bonusTokenUri
        })

        const hash = await writeContract({
          address: "0xFA80681DB103161D591035e9fE944f204c46bdFF",
          abi: abi,
          functionName: "mintVideoNFT",
          args: [mainTokenUri, bonusTokenUri, BigInt(1)]
        });

        // console.log("Transaction hash:", hash);
        // Reset form
        setFile(null)
        setTitle("")
        setDescription("")
        setBonusFile(null)
        setIsBonusEnabled(false)
        
        // Notify parent component of success
        if (onSuccess) {
          onSuccess({
            mainTokenUri,
            bonusTokenUri
          })
        }
        
        onClose()
      } catch (err) {
        console.error("Error uploading to Pinata:", err)
        setError("Failed to upload to Pinata. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [file, title, description, bonusFile, isBonusEnabled, onClose, onSuccess]
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isUploading && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1218] border-cosmic-mint/20 p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-white mb-2">Upload NFT Content</DialogTitle>
          <p className="text-gray-400 text-sm">Share your creativity with the HoriZen community and mint as NFT</p>
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
              placeholder="Enter NFT title"
              className="bg-[#1a1f2a] border-gray-700 text-white placeholder:text-gray-400 focus:border-cosmic-cyan/50 focus:ring-cosmic-cyan/50"
              required
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
              placeholder="Enter NFT description"
              className="min-h-[100px] bg-[#1a1f2a] border-gray-700 text-white placeholder:text-gray-400 focus:border-cosmic-cyan/50 focus:ring-cosmic-cyan/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video" className="text-white">
              Content File (Video/Image)
            </Label>
            <div className="relative">
              <Input id="video" type="file" accept="video/*,image/*" onChange={handleFileChange} className="hidden" />
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
            {file && file.type.startsWith("video/") && (
              <Alert className="mt-2 bg-amber-900/20 text-amber-300 border-amber-400/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Video content must be 25 seconds or less.</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBonusEnabled(!isBonusEnabled)}
            >
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

            <AnimatePresence mode="popLayout">
              {isBonusEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="space-y-2 overflow-hidden"
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
            </AnimatePresence>
          </div>

          {error && (
            <Alert className="bg-red-900/20 text-red-300 border-red-400/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-cosmic-cyan hover:bg-[#08fcdb] text-black font-semibold py-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cosmic-cyan/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading to IPFS...
                </>
              ) : (
                "Upload & Mint NFT"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}