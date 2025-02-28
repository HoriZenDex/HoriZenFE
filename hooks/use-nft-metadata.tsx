import { useReadContracts } from 'wagmi';
import { useState, useEffect } from 'react';
import { Abi } from 'viem';
import { abi } from '../VideoNFTMarketplace.json';

interface TokenURI {
  tokenId: string | number;
  uri: string;
}

interface NFTMetadata {
  tokenId: string | number;
  name: string;
  description: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
  animation_url?: string;
  related_video?: string;
  [key: string]: any;
}

interface UseNFTTokenURIsProps {
  contractAddress: `0x${string}`;
  tokenIds: (string | number)[];
}

export function useNFTMetadata({ contractAddress, tokenIds}: UseNFTTokenURIsProps) {
  const [tokenURIs, setTokenURIs] = useState<TokenURI[]>([]);
  const [metadata, setMetadata] = useState<NFTMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMetadataFetched, setIsMetadataFetched] = useState(null);

  // Prepare contract calls for each token ID
  const contractCalls = tokenIds.map((id) => ({
    address: contractAddress,
    abi: abi as Abi,
    functionName: 'tokenURI',
    args: [id],
  }));

  // Use wagmi's useReadContracts to batch the calls
  const result = useReadContracts({
    contracts: contractCalls,
  });
  
  return {
    tokenURIs,
    metadata,
    isLoading,
    error,
    refetch: result.refetch,
    result
  }
}
