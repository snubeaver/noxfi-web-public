import '~/styles/index.css';
import '~/configs/polyfill-wallet';

import { Web3Modal } from '@web3modal/react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig } from 'wagmi';

import App from '~/app.tsx';

import { ethereumClient, projectId, wagmiConfig } from './configs/setup-wallet';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);
