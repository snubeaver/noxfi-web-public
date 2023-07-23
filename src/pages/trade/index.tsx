import { InjectedConnector } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/react';
import { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { useConnect } from 'wagmi';

import { useReadLatestRoundDataEthDai } from '~/api/contracts-chainlink/read';
import { ButtonLarge } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { IconNext } from '~/components/icons';
import { TextField } from '~/components/textfield';
import { Toggle } from '~/components/toggle';
import { LOCALSTORAGE_KEYS } from '~/constants';
import { useTokenApprove } from '~/contract/approve';
import { useContractOrder } from '~/contract/order';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';
import { useTradeState } from '~/states/data/trade';
import { TRADE_OPTIONS } from '~/types';
import { parseFloat, parseNumberWithComma } from '~/utils/number';
import { orderCalldata } from '~/zkproof/order/snarkjsOrder';

import { Order } from '../my/types';

const TradePage = () => {
  const { isConnected } = useConnectWallet();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { selected, select } = useTradeState();
  const { isOpen, open } = useWeb3Modal();

  const [proofA, setProofA] = useState<string[]>();
  const [proofB, setProofB] = useState<string[][]>();
  const [proofC, setProofC] = useState<string[]>();
  const [tradeInput, setTradeInput] = useState<string[]>();

  const [amount, setAmount] = useState<number | string>('');

  const currentBalance = useReadLocalStorage<Order[]>(LOCALSTORAGE_KEYS.ORDERS);
  const [order, setOrder] = useLocalStorage<Order[]>(
    LOCALSTORAGE_KEYS.ORDERS,
    currentBalance ?? []
  );

  const { data: ethDaiData } = useReadLatestRoundDataEthDai({ staleTime: Infinity });

  const [price, setPrice] = useState<number | string>('');
  const [calculatedAmount, setCalculatedAmount] = useState<number | string>('');

  const { allowance, writeAsync: approveAsync, isLoading: isApproveLoading } = useTokenApprove();

  const currentEthDaiPrice = ethDaiData?.ethDai ?? 0;
  const currentDaiEthPrice = ethDaiData?.daiEth ?? 0;

  const currentPrice = selected === TRADE_OPTIONS.DAI_ETH ? currentDaiEthPrice : currentEthDaiPrice;
  const parsedCurrentPrice =
    currentPrice < 0.001
      ? parseFloat(currentPrice, 8)
      : parseNumberWithComma(Number(parseFloat(currentPrice, 4)));

  const currentPriceUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'DAI/ETH' : 'ETH/DAI';
  const fromUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'DAI' : 'ETH';
  const toUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'ETH' : 'DAI';

  const handleApprove = async () => {
    if (isApproveLoading) return;
    if (!isConnected) {
      connect();
      return;
    }
    await approveAsync?.();
  };

  const {
    data,
    writeAsync: orderAsync,
    isLoading: isTradeLoading,
  } = useContractOrder({
    a: proofA,
    b: proofB,
    c: proofC,
    input: tradeInput,
  });
  console.log(data);

  const callTradeData = async () => {
    if (!isConnected || !amount || amount === 0) {
      return;
    }

    const salt = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)).reduce(
      (acc, curr) => acc + curr.toString(),
      ''
    );

    const calldata = await orderCalldata(
      salt,
      Math.floor(Number(amount)).toString(),
      selected === TRADE_OPTIONS.ETH_DAI ? '1' : '0',
      price.toString()
    );
    if (!calldata) {
      return 'Invalid inputs to generate witness.';
    }

    setProofA(calldata.a);
    setProofB(calldata.b);
    setProofC(calldata.c);
    setTradeInput(calldata.Input);
  };

  const handleTradeContract = async () => {
    if (isTradeLoading || !isConnected) return;

    try {
      const result = await orderAsync?.();
      if (result) {
        alert('Successfully order verified');
      }
    } catch (error) {
      alert('order verifying failed');
    }
  };

  useEffect(() => {
    handleTradeContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderAsync]);

  // useEffect(() => {
  // {
  // hash: '0x0c4f48a85138eda2cdf1564f8783c3012117dd6bf245a00be49fb924c8c028ce';
  // }
  //   if (data && data.hash) {
  //     const addedBalance = balance.concat({
  //       id: Date.now(),
  //       note: data.hash,
  //       noteHidden: true,
  //       balance: {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         amount: parseEther(amount.toString()).toString() as any,
  //         decimalPoints: 18,
  //         tokenTicker: selected,
  //       },
  //     });
  //     setBalance(addedBalance);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  useEffect(() => {
    const amountNum = Number(amount || 0);
    const priceNum = Number(amount || 0);
    if (!amountNum || !priceNum) {
      setCalculatedAmount('');
      return;
    }
    setCalculatedAmount(Number(parseFloat(amountNum * Number(price), 8)));
  }, [amount, price]);

  useEffect(() => {
    setAmount('');
    setPrice('');
    setCalculatedAmount('');
  }, [selected]);

  return (
    <Wrapper>
      <Gnb />
      <ContentWrapper>
        <TradeWrapper>
          <Title>Trade</Title>
          <Toggle
            left={{
              id: TRADE_OPTIONS.ETH_DAI,
              text: (
                <ToggleText>
                  ETH
                  <IconNext />
                  DAI
                </ToggleText>
              ),
              handler: id => select(id as TRADE_OPTIONS),
            }}
            right={{
              id: TRADE_OPTIONS.DAI_ETH,
              text: (
                <ToggleText>
                  DAI
                  <IconNext />
                  ETH
                </ToggleText>
              ),
              handler: id => select(id as TRADE_OPTIONS),
            }}
          />
          <TradeInputWrapper>
            <CurrentPrice>{`Current Price : ${parsedCurrentPrice} ${currentPriceUnit}`}</CurrentPrice>
            <TextField
              label="Amount"
              unit={fromUnit}
              value={amount}
              handleChange={value => setAmount(value.floatValue ?? '')}
            />
            <TextField
              label="Price"
              unit={currentPriceUnit}
              value={price}
              handleChange={value => setPrice(value.floatValue ?? '')}
            />
            <TextField label="Amount" unit={toUnit} value={calculatedAmount} readOnly />
          </TradeInputWrapper>
        </TradeWrapper>
        {isConnected ? (
          !allowance ? (
            <ButtonLarge text="Approve" onClick={handleApprove} />
          ) : (
            <ButtonLarge text="Trade" isLoading={isTradeLoading} onClick={callTradeData} />
          )
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
const TradeWrapper = tw.div`
  flex flex-col gap-40
`;

const ToggleText = tw.div`
  p-8 flex-center gap-8 rounded-40
`;

const CurrentPrice = tw.div`
  font-r-16 text-yellow
`;
const TradeInputWrapper = tw.div`
  flex flex-col gap-16
`;

const Title = tw.div`
  font-sb-28 text-white
`;

export default TradePage;
