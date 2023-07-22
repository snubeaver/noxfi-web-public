import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { chains } from '~/configs/setup-wallet';
import { DEFAULT_CHAIN_ID } from '~/constants';

export const useConnectWallet = (chainId: number = DEFAULT_CHAIN_ID) => {
  const { address, isConnected } = useAccount();

  const { connect, error, isLoading } = useConnect({
    chainId,
    connector: new InjectedConnector({ chains }),
  });

  const { disconnect } = useDisconnect();

  return {
    connect,
    disconnect,
    isConnected,
    isConnectLoading: isLoading,
    isConnectError: error,

    address,
  };
};
