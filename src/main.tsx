import '~/styles/index.css';
import '~/configs/polyfill-wallet';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3Modal } from '@web3modal/react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig } from 'wagmi';

import App from '~/app.tsx';

import { ethereumClient, projectId, wagmiConfig } from './configs/setup-wallet';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </QueryClientProvider>
);
