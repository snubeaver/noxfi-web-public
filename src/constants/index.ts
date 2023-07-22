export const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';

export const IS_LOCAL = import.meta.env.VITE_START_ENV === 'local';
export const IS_DEV = import.meta.env.VITE_START_ENV === 'dev';
export const IS_PROD = import.meta.env.VITE_START_ENV === 'prod';

// export const IS_MAINNET = IS_PROD;
export const IS_MAINNET = false; // demo will be on testnet

export const CHAIN_ID = {
  ETH: 1,
  GOERLI: 5,
};
export const DEFAULT_CHAIN_ID = CHAIN_ID.GOERLI; // for test

// wallet connect project id
export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const CONTRACT_ADDRESS: Record<string, `0x${string}`> = {
  DAI: IS_MAINNET
    ? '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60'
    : '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
};
