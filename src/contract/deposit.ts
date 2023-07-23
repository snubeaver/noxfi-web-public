import { ethers } from 'ethers';
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

  const _a = [
    '13177951470014566387746914890834388342149823742951835541671396911300345551998',
    '13177951470014566387746914890834388342149823742951835541671396911300345551998',
  ];

  const _b = [
    [
      '13177951470014566387746914890834388342149823742951835541671396911300345551998',
      '13177951470014566387746914890834388342149823742951835541671396911300345551998',
    ],
    [
      '13177951470014566387746914890834388342149823742951835541671396911300345551998',
      '13177951470014566387746914890834388342149823742951835541671396911300345551998',
    ],
  ];
  const _c = [
    '13177951470014566387746914890834388342149823742951835541671396911300345551998',
    '13177951470014566387746914890834388342149823742951835541671396911300345551998',
  ];

  const _input = [
    '13177951470014566387746914890834388342149823742951835541671396911300345551998',
    '1',
    '0',
  ];

  // console.log(a, b[0], b[1], c, input);
  const { config } = usePrepareContractWrite({
    account: address,
    enabled: true,
    functionName: 'deposit',
    chainId: DEFAULT_CHAIN_ID,
    args: [
      a?.map(v => ethers.toUtf8Bytes(v)),
      b?.map(v => v.map(x => ethers.toUtf8Bytes(x))),
      c?.map(v => ethers.toUtf8Bytes(v)),
      input?.map(v => ethers.toUtf8Bytes(v)),
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
