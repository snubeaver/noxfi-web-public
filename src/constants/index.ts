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
export const NOXFI_CONTRACT_ADDRESS = '0xaD3fAcCeD2402eabaDC282d1c9a0E3839A806F99';
export const DAI = '0x5d64848D57fa2263827b07E7caC38FC9b1E0B19E';
export const WETH = '0x83A0C51E2D292b46C38126b6BebF570F49a41FE9';
export const MATCHER = '0xD5D56F27A592F2E9A008647eeAa390cc353dfc36';

export const LOCALSTORAGE_KEYS = {
  BALANCES: 'BALANCES',
  ORDERS: 'ORDERS',
};
