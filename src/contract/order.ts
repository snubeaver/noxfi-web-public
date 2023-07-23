import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { noxfiABI } from '~/abi/noxfi';
import { DEFAULT_CHAIN_ID, NOXFI_CONTRACT_ADDRESS } from '~/constants';

interface orderParam {
  a: string[] | undefined;
  b: string[][] | undefined;
  c: string[] | undefined;
  input: string[] | undefined;
}
export const useContractOrder = ({ a, b, c, input }: orderParam) => {
  const { address } = useAccount();

  const {
    isLoading: prepareLoading,
    status: prepareStatus,
    fetchStatus: prepareFetchStatus,
    config,
  } = usePrepareContractWrite({
    account: address,
    enabled: true,
    functionName: 'order',
    chainId: DEFAULT_CHAIN_ID,
    args: [a, b, c, input],
    address: NOXFI_CONTRACT_ADDRESS,
    abi: noxfiABI,
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
