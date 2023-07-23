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
  const {
    isLoading: prepareLoading,
    status: prepareStatus,
    fetchStatus: prepareFetchStatus,
    config,
  } = usePrepareContractWrite({
    chainId: DEFAULT_CHAIN_ID,
    address: NOXFI_CONTRACT_ADDRESS,
    abi: noxfiABI,
    functionName: 'deposit',
    account: address,
    args: [a, b, c, input],
    enabled: !!a && !!b && !!c && !!input,
  });

  const { data, writeAsync } = useContractWrite(config);

  const { isLoading, status, isSuccess, fetchStatus } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash,
  });

  return {
    isLoading:
      prepareLoading ||
      prepareFetchStatus === 'fetching' ||
      prepareStatus === 'loading' ||
      isLoading ||
      fetchStatus === 'fetching' ||
      status === 'loading',
    isSuccess,
    data,
    writeAsync,
  };
};
