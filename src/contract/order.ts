import { BigNumber } from 'ethers';
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

  // console.log(a, b, c, input);

  const { config } = usePrepareContractWrite({
    account: address,
    enabled: true,
    functionName: 'order',
    chainId: DEFAULT_CHAIN_ID,
    args: [
      a?.map(v => BigNumber.from(v)),
      b?.map(v => v.map(x => BigNumber.from(x))),
      c?.map(v => BigNumber.from(v)),
      input?.map(v => BigNumber.from(v)),
    ],
    address: NOXFI_CONTRACT_ADDRESS,
    abi: noxfiABI,
  });

  const { data, writeAsync } = useContractWrite(config);

  const { status, isSuccess, fetchStatus } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash,
  });

  return {
    isLoading: fetchStatus === 'fetching' && status === 'loading',
    isSuccess,
    data,
    writeAsync,
  };
};
