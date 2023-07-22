import { useWeb3Modal } from '@web3modal/react';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { ButtonLarge } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { IconNext } from '~/components/icons';
import { TextField } from '~/components/textfield';
import { Toggle } from '~/components/toggle';
import { useReadLatestRoundDataEthDai } from '~/contracts/chainlink-read';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';
import { useTradeState } from '~/states/data/trade';
import { TRADE_OPTIONS } from '~/types';
import { parseFloat, parseNumberWithComma } from '~/utils/number';

const TradePage = () => {
  const { isConnected } = useConnectWallet();
  const { selected, select } = useTradeState();
  const { isOpen, open } = useWeb3Modal();

  const { data } = useReadLatestRoundDataEthDai({ staleTime: Infinity });

  const [amount, setAmount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [calculatedAmount, setCalculatedAmount] = useState<number>();

  const currentEthDaiPrice = data?.ethDai ?? 0;
  const currentDaiEthPrice = data?.daiEth ?? 0;

  const currentPrice = selected === TRADE_OPTIONS.DAI_ETH ? currentDaiEthPrice : currentEthDaiPrice;
  const parsedCurrentPrice =
    currentPrice < 0.001
      ? parseFloat(currentPrice, 8)
      : parseNumberWithComma(Number(parseFloat(currentPrice, 4)));

  const currentPriceUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'DAI/ETH' : 'ETH/DAI';
  const fromUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'DAI' : 'ETH';
  const toUnit = selected === TRADE_OPTIONS.DAI_ETH ? 'ETH' : 'DAI';

  useEffect(() => {
    if (!amount || !price) {
      setCalculatedAmount(undefined);
      return;
    }
    setCalculatedAmount(Number(parseFloat(amount * price, 8)));
  }, [amount, price]);

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
              handleChange={value => setAmount(value.floatValue)}
            />
            <TextField
              label="Price"
              unit={currentPriceUnit}
              value={price}
              handleChange={value => setPrice(value.floatValue)}
            />
            <TextField label="Amount" unit={toUnit} value={calculatedAmount} readOnly />
          </TradeInputWrapper>
        </TradeWrapper>
        {isConnected ? (
          <ButtonLarge text="Trade" />
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
