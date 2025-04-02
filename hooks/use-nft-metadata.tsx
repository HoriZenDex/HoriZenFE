import { useReadContracts, useReadContract } from 'wagmi';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Abi } from 'viem';
import { abi } from '../VideoNFTMarketplace.json';
import { pinata } from '@/utils/config';
import { mergeNFTData } from '@/lib/data';
import { NFT } from '@/lib/types';

interface UseNFTTokenURIsProps {
  contractAddress: `0x${string}`;
}

export function useNFTMetadata({ contractAddress }: UseNFTTokenURIsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mergedNFTs, setMergedNFTs] = useState<NFT[]>([]);
  const [videoCIDArray, setVideoCIDArray] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<any[]>([]);
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);

  const { data: allTokenIds } = useReadContract({
    address: contractAddress,
    abi: abi as Abi,
    functionName: 'getAllTokenIds',
  });

  useEffect(() => {
    if (allTokenIds) {
      setTokenIds(allTokenIds as bigint[]);
    }
  }, [allTokenIds]);

  const contractCalls = useMemo(() => {
    return tokenIds.map((id) => ({
      address: contractAddress,
      abi: abi as Abi,
      functionName: 'tokenURI',
      args: [id],
    }));
  }, [contractAddress, tokenIds]);

  const result = useReadContracts({
    contracts: contractCalls,
  });
  
  const fetchPinataData = useCallback(async () => {
    console.log("result");
    console.log(result.data);
    if (!result.data || isLoading) return;
    
    setIsLoading(true);
    
    const newMetadataArray: any = [];
    
    for (let i = 0; i < result.data.length; i++) {
      const { data } = await pinata.gateways.get(result.data[i].result as string);
      newMetadataArray.push(data);
    }
    console.log("newMetadataArray");
    console.log(newMetadataArray);
    
    const mergedData = mergeNFTData(newMetadataArray);
    console.log("mergedData");
    console.log(mergedData);  
    setMergedNFTs(mergedData);
    setDataLoaded(true);
    setIsLoading(false);
  }, [result.data, isLoading]);

  useEffect(() => {
    if (result.data && !isLoading) {
      fetchPinataData();
    }
  }, [result.data, isLoading, fetchPinataData]);
  
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