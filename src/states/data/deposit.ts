import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';
import { DEPOSIT_OPTIONS } from '~/types';

export interface DepositState {
  selected: DEPOSIT_OPTIONS;
  select: (select: DEPOSIT_OPTIONS) => void;
  reset: () => void;
}

export const useDepositState = create<DepositState>()(
  immer(
    logger(set => ({
      name: 'deposit-store',
      selected: DEPOSIT_OPTIONS.DAI,
      select: (select: DEPOSIT_OPTIONS) => set(() => ({ selected: select })),
      reset: () => set(() => ({ selected: DEPOSIT_OPTIONS.DAI })),
    }))
  )
);
