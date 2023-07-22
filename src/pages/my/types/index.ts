import { Amount } from '~/types';

export interface Balance {
  id: number;
  note: string;
  noteHidden?: boolean;

  balance: Amount;
}

export enum ORDER_STATUS {
  ORDERED = 'ORDERED',
  MATCHED = 'MATCHED',
  CANCELED = 'CANCELED',
  DONE = 'DONE',
}

export interface Order {
  id: number;
  note: string;
  noteHidden?: boolean;

  from: Amount;
  to: Amount;

  status: ORDER_STATUS;
}
