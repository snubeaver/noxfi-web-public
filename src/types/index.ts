export enum DEPOSIT_OPTIONS {
  ETH = 'ETH',
  DAI = 'DAI',
}
export enum TRADE_OPTIONS {
  ETH_DAI = 'ETH_DAI',
  DAI_ETH = 'DAI_ETH',
}

export interface Amount {
  amount: bigint;
  decimalPoints: number; // 18
  tokenTicker: string; // ETH / DAI
}
