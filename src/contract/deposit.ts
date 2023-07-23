import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { noxfiABI } from '~/abi/noxfi';
import { DEFAULT_CHAIN_ID, NOXFI_CONTRACT_ADDRESS } from '~/constants';

interface depositParam {
  a: string[] | undefined;
  b: string[][] | undefined;
  c: string[] | undefined;
  input: string[] | undefined;
}
export const useContractDeposit = ({ a, b, c, input }: depositParam) => {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    account: address,
    enabled: !!a && !!b && !!c && !!input,
    functionName: 'deposit',
    cacheTime: 1000,
    staleTime: 1000,
    isDataEqual: false,
    structuralSharing: false,
    suspense: false,
    onError: () => {
      console.log('onError');
    },
    onSettled: () => {
      console.log('onSettled');
    },
    onSuccess: () => {
      console.log('onSuccess');
    },
    chainId: DEFAULT_CHAIN_ID,
    args: [a, b, c, input],
    address: NOXFI_CONTRACT_ADDRESS,
    abi: noxfiABI,
  });

  const { data, writeAsync } = useContractWrite(config);

  const { status, isSuccess, fetchStatus } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash,
    cacheTime: 1000,
    staleTime: 1000,
    isDataEqual: false,
    structuralSharing: false,
    suspense: false,
    onError: () => {
      console.log('onError');
    },
    onSettled: () => {
      console.log('onSettled');
    },
    onSuccess: () => {
      console.log('onSuccess');
    },
  });

  return {
    isLoading: fetchStatus === 'fetching' && status === 'loading',
    isSuccess,
    data,
    writeAsync,
  };
};
