import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from '../axios';
import { ReadMaticDecimalResponse } from './read-interfaces';

// TODO: FUNCTIONS
const readMaticDecimalAxios = async () =>
  (await api.get<ReadMaticDecimalResponse>(`/contracts/matic/decimals`)).data;

export const useReadMaticDecimalQuery = (options?: UseQueryOptions<ReadMaticDecimalResponse>) =>
  useQuery<ReadMaticDecimalResponse>(['api', 'read', 'matic decimals'], readMaticDecimalAxios, {
    ...options,
  });
