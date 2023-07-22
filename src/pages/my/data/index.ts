import { parseEther } from 'viem';

import { Balance, Order, ORDER_STATUS } from '../types';

export const balances: Balance[] = [
  {
    id: 1,
    note: 'test note',
    noteHidden: true,
    balance: {
      amount: parseEther('123456'),
      tokenTicker: 'ETH',
      decimalPoints: 18,
    },
  },
  {
    id: 2,
    note: 'test note',
    noteHidden: false,
    balance: {
      amount: parseEther('345123'),
      tokenTicker: 'DAI',
      decimalPoints: 18,
    },
  },
];

export const orders: Order[] = [
  {
    id: 1,
    note: 'test note',
    noteHidden: true,
    from: {
      amount: parseEther('1'),
      tokenTicker: 'ETH',
      decimalPoints: 18,
    },
    to: {
      amount: parseEther('1900'),
      tokenTicker: 'DAI',
      decimalPoints: 18,
    },
    status: ORDER_STATUS.ORDERED,
  },
  {
    id: 2,
    note: 'test note',
    noteHidden: true,
    from: {
      amount: parseEther('1'),
      tokenTicker: 'ETH',
      decimalPoints: 18,
    },
    to: {
      amount: parseEther('1900'),
      tokenTicker: 'DAI',
      decimalPoints: 18,
    },
    status: ORDER_STATUS.MATCHED,
  },
  {
    id: 3,
    note: 'test note',
    noteHidden: true,
    from: {
      amount: parseEther('1'),
      tokenTicker: 'ETH',
      decimalPoints: 18,
    },
    to: {
      amount: parseEther('1900'),
      tokenTicker: 'DAI',
      decimalPoints: 18,
    },
    status: ORDER_STATUS.CANCELED,
  },
  {
    id: 4,
    note: 'test note',
    noteHidden: true,
    from: {
      amount: parseEther('1'),
      tokenTicker: 'DAI',
      decimalPoints: 18,
    },
    to: {
      amount: parseEther('1900'),
      tokenTicker: 'ETH',
      decimalPoints: 18,
    },
    status: ORDER_STATUS.DONE,
  },
];
