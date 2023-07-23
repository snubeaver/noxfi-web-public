export const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';

export const IS_LOCAL = import.meta.env.VITE_START_ENV === 'local';
export const IS_DEV = import.meta.env.VITE_START_ENV === 'dev';
export const IS_PROD = import.meta.env.VITE_START_ENV === 'prod';

// export const IS_MAINNET = IS_PROD;
export const IS_MAINNET = false; // demo will be on testnet

export const CHAIN_ID = {
  ETH: 1,
  GOERLI: 5,
  ZKEVM_TESTNET: 1442,
};
export const DEFAULT_CHAIN_ID = CHAIN_ID.ZKEVM_TESTNET; // for test

// wallet connect project id
export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  CHAINLINK_ETH_DAI: IS_MAINNET
    ? '0x773616e4d11a78f511299002da57a0a94577f1f4'
    : '0x773616e4d11a78f511299002da57a0a94577f1f4',
};

export const API_URL = IS_LOCAL ? 'http://localhost:8080' : 'https://api.nox.finance';
export const NOXFI_CONTRACT_ADDRESS = '0x954648A63eBC8be4717c08Bf229C988226fC8A50';
export const DAI = '0x8D4137163E0679f94ED07D45152F229e46fc3a4c';
export const WETH = '0xd36115B12E7408F8142F8451CE97CEB2E14ab2FF';
export const MATCHER = '0xD5D56F27A592F2E9A008647eeAa390cc353dfc36';
