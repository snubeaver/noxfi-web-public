import { BigNumber } from 'ethers';
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

  console.log(a, b, c, input);

  // const _a = [
  //   '0x2f5b8bcbe1b6619286c2420ba7b7d58ef8d1d420194b093d5d390419d1bf65cd',
  //   '0x03803557ceba63599f1257127bbd7d87e3f2cc3fa58659e1b2198f102d60bd71',
  // ];
  // const _b = [
  //   [
  //     '0x254811b29b5a5eaaeb0cd4b08d22cc2ea48f39dc55a8837797e9d1958f059ff5',
  //     '0x072a6cfeed6c25dc4155eb1f147e542a02ec6422923513cece6c152e8e8a98dc',
  //   ],
  //   [
  //     '0x02c34d46b187230478090fa42df73a3ae541977154838ac8160fc9dda0f41332',
  //     '0x0663a6567e94e8d8face50fc31aa661e8ed797aa94caef14a3736890d45aeedd',
  //   ],
  // ];
  // const _c = [
  //   '0x1057db8eb1ae6d1fd4ac9007686a2ef868ba1b6a23a33dedd714273ad8404a30',
  //   '0x176cbdd2fbde2409afbe1c2d088975e1321443d4c55a741049317de868eeae02',
  // ];
  // const _input = [
  //   '0x29aa172d233dcb3dab18a7e8df39a9dc1cb476d3ad49568910e90ed107f334ed',
  //   '0x000000000000000000000000000000000000000000000000000000000000064',
  //   '0x0000000000000000000000000000000000000000000000000000000000000000',
  // ];
  const { config } = usePrepareContractWrite({
    account: address,
    enabled: true,
    functionName: 'deposit',
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
