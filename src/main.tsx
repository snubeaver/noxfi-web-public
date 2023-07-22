import { Web3Modal } from '@web3modal/react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig } from 'wagmi';

import App from '~/app.tsx';

import { ethereumClient, wagmiConfig } from './configs/setup-wallet';
import { WALLETCONNECT_PROJECT_ID } from './constants';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={WALLETCONNECT_PROJECT_ID} ethereumClient={ethereumClient} />
  </>
);
