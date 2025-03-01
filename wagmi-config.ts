import { http, createConfig } from 'wagmi'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { defineChain } from 'viem'

// Definir la nueva cadena personalizada
const abcChain = defineChain({
  id: 112,
  name: 'ABC Testnet',
  network: 'abcTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ABC',
    symbol: 'ABC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.abc.t.raas.gelato.cloud'],
    },
    public: {
      http: ['https://rpc.abc.t.raas.gelato.cloud'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ABC Explorer',
      url: 'https://explorer.abc.t.raas.gelato.cloud',
    },
  },
})

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [abcChain],
  connectors: [
    injected({
      target: 'rabby',
    }),
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [abcChain.id]: http(),
  },
})