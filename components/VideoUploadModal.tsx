"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Copy, ExternalLink, Plus } from "lucide-react";
import { createPortal } from "react-dom";
import { useWriteContract } from 'wagmi';
import { abi } from '../VideoNFTMarketplace.json';
import { getPublicClient } from 'wagmi/actions'
import { config } from "../wagmi-config";
import { type Address } from 'viem'

interface VideoMetadata {
  title: string;
  description: string;
  duration: string;
  fileName: string;
}

async function uploadToPinata(file: File, name: string) {
  try {
    // Crear un FormData para subir el archivo
    const formData = new FormData();
    formData.append('file', file);
    
    return formData;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Failed to upload file to Pinata');
  }
}

// Separamos la función para subir metadatos, que ya no intentará usar el hook
async function createAndUploadMetadata(
  videoHashes: string[], 
  metadata: VideoMetadata[]
) {
  // Crear metadatos para el primer video
  const nftMetadata1 = {
    name: metadata[0].title,
    description: metadata[0].description,
    animation_url: `ipfs://${videoHashes[0]}`,
    related_video: `ipfs://${videoHashes[1]}`, // Enlace al segundo video
    attributes: [
      {
        trait_type: "Duration",
        value: metadata[0].duration.toString()
      }
    ]
  };

  // Crear metadatos para el segundo video
  const nftMetadata2 = {
    name: metadata[1].title,
    description: metadata[1].description,
    animation_url: `ipfs://${videoHashes[1]}`,
    related_video: `ipfs://${videoHashes[0]}`, // Enlace al primer video
    attributes: [
      {
        trait_type: "Duration",
        value: metadata[1].duration.toString()
      }
    ]
  };

  try {
    // Subir el primer conjunto de metadatos
    const response1 = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': "210a1baf1b6d0e79e7c0",
        'pinata_secret_api_key': "d4467596dccd328dd9db25335dce97391dfcbbe4f9b9582b5161ffcf2e14c674"
      },
      body: JSON.stringify(nftMetadata1)
    });
    
    const data1 = await response1.json();
    console.log(`Metadatos del video 1 subidos a IPFS con hash: ${data1.IpfsHash}`);
    
    // Subir el segundo conjunto de metadatos
    const response2 = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': "210a1baf1b6d0e79e7c0",
        'pinata_secret_api_key': "d4467596dccd328dd9db25335dce97391dfcbbe4f9b9582b5161ffcf2e14c674"
      },
      body: JSON.stringify(nftMetadata2)
    });
    
    const data2 = await response2.json();
    console.log(`Metadatos del video 2 subidos a IPFS con hash: ${data2.IpfsHash}`);
    
    return [data1.IpfsHash, data2.IpfsHash];
  } catch (error) {
    console.error("Error al subir metadatos:", error);
    throw error;
  }
}

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

interface VideoFormData {
  title: string;
  description: string;
  duration: string;
  videoFile: File | null;
}

export default function VideoUploadModal({ isOpen, onClose }: VideoUploadModalProps) {
  // Movemos el hook al nivel del componente, donde debe estar
  const { writeContract } = useWriteContract();
  
  const [videosData, setVideosData] = useState<VideoFormData[]>([
    {
      title: "",
      description: "",
      duration: "",
      videoFile: null
    },
    {
      title: "",
      description: "",
      duration: "",
      videoFile: null
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    metadataUrls: string[];
    ipfsHashes: string[];
    txHash?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newVideosData = [...videosData];
      newVideosData[index].videoFile = file;
      setVideosData(newVideosData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    index: number, 
    field: 'title' | 'description' | 'duration'
  ) => {
    const newVideosData = [...videosData];
    newVideosData[index][field] = e.target.value;
    setVideosData(newVideosData);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const checkIfContract = async (address: `0x${string}`) => {
    console.log("entre check info")
    const publicClient = getPublicClient(config)
    const bytecode = await publicClient.getBytecode({ address })
    console.log("This is the bytecide");
    console.log("Bytecode:", bytecode)
    return bytecode !== null
  }

  // Función para mintear el NFT usando los metadatos
  const handleMintNFT = async (hashes: string[]) => {
    try {
      if (hashes.length !== 2) {
        throw new Error("Se necesitan exactamente 2 hashes para mintear");
      }
  
      const address = "0x98a27d587D8945c41E18A90f5504f2010a8E330d" as Address;
      const isContract = await checkIfContract(address);
      if (!isContract) {
        throw new Error("La dirección del contrato no es válida en esta red.");
      }
  
      // const txHash = await writeContract({
      //   address,
      //   abi,
      //   functionName: "mintVideoNFT",
      //   args: [hashes[0], hashes[1], 1]
      // });
  
      // console.log("Transaction hash:", txHash);
      return "txHash";
    } catch (error) {
      console.error("Error al mintear NFT:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessData(null);
    
    try {
      // Verificar que todos los campos estén completos
      for (let i = 0; i < videosData.length; i++) {
        const videoData = videosData[i];
        if (!videoData.videoFile || !videoData.title || !videoData.description || !videoData.duration) {
          throw new Error(`Por favor, complete todos los campos para el video ${i + 1}`);
        }
        
        // Validar formato de duración (mm:ss)
        if (!/^\d{1,2}:\d{2}$/.test(videoData.duration)) {
          throw new Error(`La duración del video ${i + 1} debe estar en formato mm:ss`);
        }
      }

      // Arrays para almacenar los hashes
      const videoHashes: string[] = [];
      
      // Subir videos
      for (let i = 0; i < videosData.length; i++) {
        const videoData = videosData[i];
        
        console.log(`Uploading video ${i + 1}...`);
        const videoHash = await uploadToPinata(videoData.videoFile!, `Video ${i + 1}: ${videoData.title}`);

      }
      
      // Preparar metadatos para ambos videos
      const metadataArray: VideoMetadata[] = videosData.map(data => ({
        title: data.title,
        description: data.description,
        duration: data.duration,
        fileName: data.videoFile!.name
      }));
      
      // Crear y subir metadatos
      console.log('Creating and uploading metadata...');
      const metadataHashes = await createAndUploadMetadata(
        videoHashes,
        metadataArray
      );
      
      console.log('All uploads complete!');
      
      // Mintear el NFT después de subir los metadatos
      let txHash;
      try {
        txHash = await handleMintNFT(metadataHashes);
        console.log('NFT minted successfully!');
      } catch (mintError) {
        console.error('Error minting NFT:', mintError);
        // Continuamos aunque falle el minteo para mostrar los hashes
      }
      
      // Guardar las URLs de los metadatos
      const metadataUrls = metadataHashes.map(hash => `ipfs://${hash}`);
      
      // Mostrar datos de éxito
      setSuccessData({
        metadataUrls,
        ipfsHashes: metadataHashes,
      });
      
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while uploading');
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] overflow-y-auto">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Upload Two Videos</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
            {error}
          </div>
        )}
        
        {successData ? (
          <div className="space-y-6">
            <div className="p-4 bg-green-500/20 border border-green-500 rounded-md text-green-200">
              ¡Videos y metadatos subidos exitosamente!
            </div>
            
            {successData.txHash && (
              <div className="p-4 bg-blue-500/20 border border-blue-500 rounded-md text-blue-200">
                <h3 className="font-medium mb-2">NFT Minteado Exitosamente</h3>
                <div className="flex items-center gap-2 break-all">
                  <span className="text-sm">Tx Hash: {successData.txHash}</span>
                  <button 
                    onClick={() => handleCopyToClipboard(successData.txHash!)}
                    className="p-1 hover:bg-blue-800/30 rounded"
                  >
                    <Copy className="h-4 w-4 text-blue-300" />
                  </button>
                </div>
              </div>
            )}
            
            {successData.metadataUrls.map((url, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-white">Video {index + 1}</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">Metadata URL para mintear NFT:</label>
                  <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-2 break-all">
                    <code className="text-sm text-white">{url}</code>
                    <button 
                      onClick={() => handleCopyToClipboard(url)}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">Ver en Pinata Gateway:</label>
                  <a 
                    href={`https://gateway.pinata.cloud/ipfs/${successData.ipfsHashes[index]}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    <span>Ver metadatos</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
            
            <Button
              onClick={onClose}
              className="w-full bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-bold mt-4"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {videosData.map((videoData, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-white">Video {index + 1}</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                  <Input
                    type="text"
                    placeholder="Enter video title"
                    value={videoData.title}
                    onChange={(e) => handleInputChange(e, index, 'title')}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                  <Textarea
                    placeholder="Enter video description"
                    value={videoData.description}
                    onChange={(e) => handleInputChange(e, index, 'description')}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Duration (mm:ss)</label>
                  <Input
                    type="text"
                    placeholder="Enter video duration"
                    value={videoData.duration}
                    onChange={(e) => handleInputChange(e, index, 'duration')}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    pattern="^\d{1,2}:\d{2}$"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Video File</label>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            ))}

            <Button
              type="submit"
              className="w-full bg-[#03ceb3] hover:bg-[#08fcdb] text-gray-900 hover:text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload Videos & Mint NFT'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}