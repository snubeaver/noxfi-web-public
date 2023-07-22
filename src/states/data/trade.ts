import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';
import { TRADE_OPTIONS } from '~/types';

export interface TradeState {
  selected: TRADE_OPTIONS;
  select: (select: TRADE_OPTIONS) => void;
  reset: () => void;
}

export const useTradeState = create<TradeState>()(
  immer(
    logger(set => ({
      name: 'trade-store',
      selected: TRADE_OPTIONS.ETH_DAI,
      select: (select: TRADE_OPTIONS) => set(() => ({ selected: select })),
      reset: () => set(() => ({ selected: TRADE_OPTIONS.DAI_ETH })),
    }))
  )
);
