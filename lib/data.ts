import type { NFT, BonusFeature, KeyBenefit } from "./types"
import { ViewIcon as View360 } from "lucide-react"

export const nftExamples: NFT[] = [
  {
    id: 1,
    title: "Cosmic Voyage",
    creator: "StarGazer",
    price: "0.5 ETH",
    type: "image",
    likes: 1200,
    comments: 89,
    shares: 45,
    bonusFeatures: 2,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
  {
    id: 2,
    title: "Beach video 1",
    creator: "CyberArtist",
    price: "0.7 ETH",
    type: "video",
    likes: 980,
    comments: 120,
    shares: 67,
    bonusFeatures: 1,
    hasKeyBenefit: false,
    url: "/placeholder.svg?height=400&width=600",
    is360: false,
  },
  {
    id: 3,
    title: "Neon Nights",
    creator: "GlowMaster",
    price: "0.6 ETH",
    type: "image",
    likes: 1500,
    comments: 210,
    shares: 98,
    bonusFeatures: 2,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
  {
    id: 4,
    title: "Beach video 1",
    creator: "SpaceWizard",
    price: "0.8 ETH",
    type: "video",
    likes: 2200,
    comments: 180,
    shares: 120,
    bonusFeatures: 3,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
  {
    id: 5,
    title: "Ethereal Whispers",
    creator: "DreamWeaver",
    price: "0.4 ETH",
    type: "image",
    likes: 950,
    comments: 78,
    shares: 34,
    bonusFeatures: 1,
    hasKeyBenefit: false,
    url: "/placeholder.svg?height=400&width=600",
    is360: false,
  },
  {
    id: 6,
    title: "Beach video 1",
    creator: "NeonMaster",
    price: "0.9 ETH",
    type: "video",
    likes: 2800,
    comments: 230,
    shares: 180,
    bonusFeatures: 3,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
  {
    id: 7,
    title: "Galactic Bloom",
    creator: "StarDust",
    price: "0.6 ETH",
    type: "image",
    likes: 1700,
    comments: 145,
    shares: 90,
    bonusFeatures: 2,
    hasKeyBenefit: true,
    url: "/placeholder.svg?height=400&width=600",
    is360: false,
  },
  {
    id: 8,
    title: "Beach video 1",
    creator: "WaveRider",
    price: "0.75 ETH",
    type: "video",
    likes: 2100,
    comments: 190,
    shares: 110,
    bonusFeatures: 2,
    hasKeyBenefit: false,
    url: "/placeholder.svg?height=400&width=600",
    is360: true,
  },
]

export const bonusFeatures: BonusFeature[] = [
  { title: "Exclusive Access", description: "Gain early access to new NFT drops and collections." },
  { title: "Community Perks", description: "Enjoy special benefits and rewards within our community." },
  { title: "Creator Interaction", description: "Direct communication channel with the NFT creator." },
  { title: "360° Image Viewing", description: "Immersive 360° viewing experience for image NFTs.", icon: View360 },
  {
    title: "360° Video Playback",
    description: "Full 360° video playback support for an immersive experience.",
    icon: View360,
  },
]

export const keyBenefit: KeyBenefit = {
  title: "Lifetime Membership",
  description: "Enjoy exclusive benefits for life as a key holder.",
}

export const videoNFTs = nftExamples.filter((nft) => nft.type === "video")

export interface CreatorContent {
  id: string
  title: string
  type: "videos" | "images"
  url: string
  thumbnail?: string
  likes: number
  comments: number
  shares: number
  price: string
}

export interface Creator {
  id: string
  name: string
  avatar: string
  bio: string
  subscribers: number
  content: CreatorContent[]
}

// Update the creators array with new avatar URLs
export const creators: Creator[] = [
  {
    id: "cosmicraft",
    name: "CosmiCraft",
    avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?fit=crop&w=150&h=150",
    bio: "Crafting cosmic experiences through digital art and immersive videos. Join me on a journey through the stars and beyond!",
    subscribers: 125000,
    content: [
      {
        id: "cc1",
        title: "Nebula Dreams",
        type: "videos",
        url: "https://example.com/nebula-dreams.mp4",
        thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2700&q=80",
        likes: 15000,
        comments: 2800,
        shares: 5600,
        price: "0.5 ETH",
      },
      {
        id: "cc2",
        title: "Galactic Horizons",
        type: "images",
        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2700&q=80",
        likes: 12000,
        comments: 1500,
        shares: 3000,
        price: "0.3 ETH",
      },
      {
        id: "cc3",
        title: "Cosmic Voyage",
        type: "videos",
        url: "https://example.com/cosmic-voyage.mp4",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
        likes: 18000,
        comments: 3200,
        shares: 7000,
        price: "0.6 ETH",
      },
      {
        id: "cc4",
        title: "Stellar Nursery",
        type: "images",
        url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1000&q=80",
        likes: 9500,
        comments: 1100,
        shares: 2200,
        price: "0.2 ETH",
      },
      {
        id: "cc5",
        title: "Cosmic Dust",
        type: "images",
        url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=80",
        likes: 11000,
        comments: 1300,
        shares: 2800,
        price: "0.35 ETH",
      },
      {
        id: "cc6",
        title: "Interstellar Journey",
        type: "videos",
        url: "https://example.com/interstellar-journey.mp4",
        thumbnail: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1000&q=80",
        likes: 20000,
        comments: 4000,
        shares: 8500,
        price: "0.7 ETH",
      },
    ],
  },
  {
    id: "nebulaart",
    name: "NebulaArt",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150",
    bio: "Exploring the beauty of nebulae through digital artistry. Join me on a cosmic journey through vibrant colors and ethereal forms.",
    subscribers: 98000,
    content: [
      {
        id: "na1",
        title: "Cosmic Dust",
        type: "videos",
        url: "https://example.com/cosmic-dust.mp4",
        thumbnail: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1957&q=80",
        likes: 10000,
        comments: 1800,
        shares: 4000,
        price: "0.4 ETH",
      },
      {
        id: "na2",
        title: "Stellar Nursery",
        type: "images",
        url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1957&q=80",
        likes: 9000,
        comments: 1200,
        shares: 2500,
        price: "0.25 ETH",
      },
      {
        id: "na3",
        title: "Nebula Whispers",
        type: "videos",
        url: "https://example.com/nebula-whispers.mp4",
        thumbnail: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1000&q=80",
        likes: 12000,
        comments: 2200,
        shares: 5000,
        price: "0.55 ETH",
      },
      {
        id: "na4",
        title: "Celestial Bloom",
        type: "images",
        url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1000&q=80",
        likes: 8500,
        comments: 950,
        shares: 1800,
        price: "0.15 ETH",
      },
      {
        id: "na5",
        title: "Galactic Currents",
        type: "videos",
        url: "https://example.com/galactic-currents.mp4",
        thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1000&q=80",
        likes: 15000,
        comments: 2800,
        shares: 6200,
        price: "0.6 ETH",
      },
      {
        id: "na6",
        title: "Nebula's Heart",
        type: "images",
        url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1000&q=80",
        likes: 11000,
        comments: 1600,
        shares: 3200,
        price: "0.3 ETH",
      },
      {
        id: "na7",
        title: "Cosmic Ballet",
        type: "videos",
        url: "https://example.com/cosmic-ballet.mp4",
        thumbnail: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=80",
        likes: 18000,
        comments: 3500,
        shares: 7800,
        price: "0.75 ETH",
      },
      {
        id: "na8",
        title: "Stardust Dreams",
        type: "images",
        url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=80",
        likes: 9800,
        comments: 1400,
        shares: 2900,
        price: "0.2 ETH",
      },
    ],
  },
  {
    id: "quantumvisions",
    name: "QuantumVisions",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?fit=crop&w=150&h=150",
    bio: "Visualizing quantum concepts through cutting-edge digital art.",
    subscribers: 87500,
    content: [],
  },
  {
    id: "etherealmuse",
    name: "EtherealMuse",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150",
    bio: "Creating ethereal and dreamy digital experiences.",
    subscribers: 76000,
    content: [],
  },
  {
    id: "cryptocanvas",
    name: "CryptoCanvas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150",
    bio: "Bringing blockchain and art together in unique ways.",
    subscribers: 65000,
    content: [],
  },
]

// Update trendingCreators to use the same avatar URLs
export const trendingCreators = creators.map((creator, index) => ({
  id: creator.id,
  rank: index + 1,
  name: creator.name,
  subscribers: creator.subscribers,
  avatar: creator.avatar,
}))

// Update the zenContent to use creator IDs
export const zenContent = [
  {
    id: 1,
    title: "Cosmic Meditation",
    creatorId: "cosmicraft",
    likes: 1200,
    comments: 89,
    shares: 45,
    type: "video",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
  },
  // ... (update the rest of the zenContent items with creatorId)
]

// Nueva función para combinar datos estáticos con datos de la blockchain
export function mergeNFTData(onChainMetadata: any[], staticNFTs: NFT[] = nftExamples): NFT[] {
  // Crear una copia para no modificar los originales
  const mergedNFTs = [...staticNFTs];
  
  // Actualizar las URLs basadas en la metadata
  mergedNFTs.forEach((nft) => {
    onChainMetadata.forEach((data) => {
      if (nft.title === data.name) {
        // Actualizar la URL solo si hay related_video
        if (data.related_video) {
          nft.url = `https://gateway.pinata.cloud/ipfs/${data.related_video}`;
        }
        
        // También puedes actualizar otros campos
        if (data.description) {
          nft.description = data.description;
        }
      }
    });
  });
  
  return mergedNFTs;
}

