import { useWeb3Modal } from '@web3modal/react';
import tw from 'twin.macro';

import { ButtonLarge } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { TextField } from '~/components/textfield';
import { Toggle } from '~/components/toggle';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';
import { useDepositState } from '~/states/data/deposit';
import { DEPOSIT_OPTIONS } from '~/types';

const MainPage = () => {
  const { isConnected } = useConnectWallet();
  const { selected, select } = useDepositState();
  const { isOpen, open } = useWeb3Modal();

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
          <TextField label="Amount" unit={selected} />
        </DepositWrapper>
        {isConnected ? (
          <ButtonLarge text="Deposit" />
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

export default MainPage;
