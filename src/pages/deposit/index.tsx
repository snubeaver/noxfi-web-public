import { InjectedConnector } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/react';
import { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { useConnect } from 'wagmi';

import { ButtonLarge } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { TextField } from '~/components/textfield';
import { Toggle } from '~/components/toggle';
import { useContractDeposit } from '~/contract/deposit';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';
import { useDepositState } from '~/states/data/deposit';
import { DEPOSIT_OPTIONS } from '~/types';

import { depositCalldata } from '../../zkproof/deposit/snarkjsDeposit';

const DepositPage = () => {
  const { isConnected } = useConnectWallet();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { selected, select } = useDepositState();
  const { isOpen, open } = useWeb3Modal();
  const [amount, setAmount] = useState<number | undefined>();
  const [proofA, setProofA] = useState<string[]>();
  const [proofB, setProofB] = useState<string[][]>();
  const [proofC, setProofC] = useState<string[]>();
  const [depositInput, setDepositInput] = useState<string[]>();

  const { writeAsync: depositAsync, isLoading: isDepositLoading } = useContractDeposit({
    a: proofA,
    b: proofB,
    c: proofC,
    input: depositInput,
  });

  const handleDeposit = async () => {
    if (!isConnected || !amount || amount === 0) {
      return;
    }
    calculateProof();
  };

  const calculateProof = async () => {
    if (!amount || amount === 0) {
      return;
    }

    const salt = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)).reduce(
      (acc, curr) => acc + curr.toString(),
      ''
    );

    const calldata = await depositCalldata(
      salt,
      Math.floor(amount).toString(),
      selected === DEPOSIT_OPTIONS.DAI ? '0' : '1'
    );
    if (!calldata) {
      return 'Invalid inputs to generate witness.';
    }
    console.log('calldata', calldata);

    setProofA(calldata.a);
    setProofB(calldata.b);
    setProofC(calldata.c);
    setDepositInput(calldata.Input);
  };

  const handleDepositContract = useCallback(async () => {
    if (isDepositLoading) return;
    if (!isConnected) {
      connect();
      return;
    }
    try {
      const result = await depositAsync?.();
      console.log('result', result);
      alert('Successfully verified');
    } catch (error) {
      console.log(error);
      alert('deposit verifying failed');
    }
  }, [connect, depositAsync, isConnected, isDepositLoading]);

  useEffect(() => {
    handleDepositContract();
  }, [depositAsync, handleDepositContract, proofA, proofB, proofC, depositInput]);

  useEffect(() => {
    if (amount) {
      console.log(amount);
    }
  }, [amount]);

  const [amount, setAmount] = useState<number | string>('');

  useEffect(() => {
    setAmount('');
  }, [selected]);

  return (
    <Wrapper>
      <Gnb />
      <ContentWrapper>
        <DepositWrapper>
          <Title>Deposit</Title>
          <Toggle
            left={{
              id: DEPOSIT_OPTIONS.DAI,
              text: DEPOSIT_OPTIONS.DAI,
              handler: id => select(id as DEPOSIT_OPTIONS),
            }}
            right={{
              id: DEPOSIT_OPTIONS.ETH,
              text: DEPOSIT_OPTIONS.ETH,
              handler: id => select(id as DEPOSIT_OPTIONS),
            }}
          />
          <TextField
            label="Amount"
            unit={selected}
            value={amount}
            handleChange={value => setAmount(value.floatValue ?? '')}
          />
        </DepositWrapper>
        {isConnected ? (
          <ButtonLarge text="Deposit" onClick={handleDeposit} />
        ) : (
          <ButtonLarge text="Connect Wallet" isLoading={isOpen} onClick={open} />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-full h-full pt-74
  flex flex-col items-center justify-between min-h-822 overflow-auto
`;
const ContentWrapper = tw.div`
  mt-100 mb-120 w-480 flex flex-col gap-60
`;
const DepositWrapper = tw.div`
  flex flex-col gap-40
`;
const Title = tw.div`
  font-sb-28 text-white
`;

export default DepositPage;
