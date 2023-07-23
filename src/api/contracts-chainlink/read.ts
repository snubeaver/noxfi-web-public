import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { formatEther } from 'viem';

import { aggregatorV3InterfaceABI } from '~/abi/chainlink';
import { publicClient } from '~/configs/setup-provider';
import { CONTRACT_ADDRESS } from '~/constants';

import { ReadLatestRoundDataEthDaiResponse } from './read-interfaces';

const readLatestRoundDataEthDai = () =>
  publicClient.readContract({
    address: CONTRACT_ADDRESS.CHAINLINK_ETH_DAI,
    abi: aggregatorV3InterfaceABI,
    functionName: 'latestRoundData',
  });

export const useReadLatestRoundDataEthDai = (
  options?: UseQueryOptions<bigint[], unknown, ReadLatestRoundDataEthDaiResponse>
) =>
  useQuery<bigint[], unknown, ReadLatestRoundDataEthDaiResponse>(
    ['contract', 'read', 'latest-round-data-eth-dai'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => readLatestRoundDataEthDai() as any,
    {
      ...options,
      select: data => {
        return {
          ethDai: 1 / Number(formatEther(data[1])),
          daiEth: Number(formatEther(data[1])),
          startedAt: new Date(Number(data[2]) * 1000),
          updatedAt: new Date(Number(data[3]) * 1000),
        };
      },
    }
  );
