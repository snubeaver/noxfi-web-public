import { useMemo, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { TOKEN_ABI } from '~/abi/token';
import { DAI, DEFAULT_CHAIN_ID, NOXFI_CONTRACT_ADDRESS } from '~/constants';

export const useTokenApprove = () => {
  const [allowance, setAllowance] = useState(false);

  const { address: walletAddress } = useAccount();
  const enabled = useMemo(() => !!walletAddress, [walletAddress]);

  console.log(walletAddress);
  useContractRead({
    address: DAI,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [walletAddress, NOXFI_CONTRACT_ADDRESS],
    enabled,
    onSuccess: data => {
      const bigInt = BigInt(data?.toString() ?? '0');

      setAllowance(bigInt > 0);
    },
  });

  const { config } = usePrepareContractWrite({
    account: walletAddress,
    chainId: DEFAULT_CHAIN_ID,
    address: DAI,
    abi: TOKEN_ABI,
    functionName: 'approve',
    args: [
      NOXFI_CONTRACT_ADDRESS,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ],
    enabled: true,
  });
  const { data, writeAsync } = useContractWrite(config);

  const { isLoading, isSuccess, isFetching } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash,
  });

  return { allowance, isLoading: isLoading || isFetching, isSuccess, data, writeAsync };
};

export const useAllowance = () => {
  const [allowanceAmount, setAllowanceAmount] = useState<bigint>(BigInt('0'));

  const { address: walletAddress } = useAccount();
  const enabled = useMemo(() => !!walletAddress, [walletAddress]);

  const { refetch, isFetching } = useContractRead({
    address: DAI,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [walletAddress, NOXFI_CONTRACT_ADDRESS],
    enabled,
    onSuccess: data => {
      const bigInt = BigInt(data?.toString() ?? '0');

      setAllowanceAmount(bigInt);
    },
  });

  return { allowanceAmount, refetch, isFetching };
};
