import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { goerli, polygonZkEvmTestnet } from 'wagmi/chains';

import { WALLETCONNECT_PROJECT_ID } from '~/constants';

export const chains = [polygonZkEvmTestnet, goerli]; // for test
export const projectId = WALLETCONNECT_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
