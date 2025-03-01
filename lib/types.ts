import type { LucideIcon } from "lucide-react"

export type NFTType = "image" | "video"

export interface NFT {
  tokenId: unknown
  image: string | undefined
  id: number
  title: string
  creator: string
  price: string
  type: NFTType
  likes: number
  comments: number
  shares: number
  bonusFeatures: number
  hasKeyBenefit: boolean
  url: string
  is360: boolean
  description?: string
}

export interface BonusFeature {
  title: string
  description: string
  icon?: LucideIcon
}

export interface KeyBenefit {
  title: string
  description: string
}

