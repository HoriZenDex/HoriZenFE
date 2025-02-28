import { useReadContracts } from 'wagmi';
import { useState, useCallback, useMemo } from 'react';
import { Abi } from 'viem';
import { abi } from '../VideoNFTMarketplace.json';
import { pinata } from '@/utils/config';
import { mergeNFTData } from '@/lib/data';
import { NFT } from '@/lib/types';

interface UseNFTTokenURIsProps {
  contractAddress: `0x${string}`;
  tokenIds: (string | number)[];
}

export function useNFTMetadata({ contractAddress, tokenIds}: UseNFTTokenURIsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mergedNFTs, setMergedNFTs] = useState<NFT[]>([]);
  const [videoCIDArray, setVideoCIDArray] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<any[]>([]);

  // Prepare contract calls for each token ID
  const contractCalls = useMemo(() => {
    return tokenIds.map((id) => ({
      address: contractAddress,
      abi: abi as Abi,
      functionName: 'tokenURI',
      args: [id],
    }));
  }, [contractAddress, tokenIds]);

  // Use wagmi's useReadContracts to batch the calls
  const result = useReadContracts({
    contracts: contractCalls,
  });
  
  // Función para obtener datos de Pinata - simplificada
  const fetchPinataData = useCallback(async () => {
    if (!result.data || isLoading) return;
    
    setIsLoading(true);
    
    const newMetadataArray: any = [];
    
    for (let i = 0; i < result.data.length; i++) {
      const { data } = await pinata.gateways.get(result.data[i].result as string);
      newMetadataArray.push(data);
    }

    const processedMetadata = newMetadataArray.map((item: any) => {
      if (item?.related_video) {
        return {
          ...item,
          related_video: item.related_video.replace('ipfs://', '')
        };
      }
      return item;
    });
    
    const mergedData = mergeNFTData(processedMetadata);
    setMergedNFTs(mergedData);
    setDataLoaded(true);
    setIsLoading(false);
  }, [result.data, isLoading]);

  
  return {
    refetch: result.refetch,
    result,
    videoCIDArray,
    mergedNFTs,
    fetchPinataData,
    isLoading,
    dataLoaded,
  }
}