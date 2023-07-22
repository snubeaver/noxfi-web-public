import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import { COLOR } from '~/assets/colors';
import { IconLogout } from '~/components/icons';
import { CONTRACT_ADDRESS } from '~/constants';
import { useNativeTokenBalances, useTokenBalances } from '~/hooks/data/use-balance';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';
import { shortenAddress } from '~/utils/string';

export const DropdownProfile = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { address, disconnect } = useConnectWallet();
  const { formattedWithComma: ethBalance } = useNativeTokenBalances(address);
  const { formattedWithComma: daiBalance } = useTokenBalances(address, CONTRACT_ADDRESS.DAI);

  const [opened, open] = useState(false);
  const toggle = () => open(!opened);

  useOnClickOutside(ref, () => open(false));

  return (
    <Wrapper ref={ref} opened={opened}>
      <ContentWrapper onClick={toggle}>{shortenAddress(address ?? '')}</ContentWrapper>
      {opened && (
        <DropdownWrapper>
          <TokenWrapper>
            <Token>{ethBalance}</Token>
            <Label>{'ETH'}</Label>
          </TokenWrapper>
          <TokenWrapper>
            <Token>{daiBalance}</Token>
            <Label>{'DAI'}</Label>
          </TokenWrapper>
          <DisconnectWrapper onClick={() => disconnect()}>
            <IconLogout color={COLOR.GRAY2} />
            Disconnect
          </DisconnectWrapper>
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

interface WrapperProps {
  opened?: boolean;
}
const Wrapper = styled.div<WrapperProps>(({ opened }) => [
  tw`relative flex px-24 py-10 select-none bg-gray5 rounded-8 font-r-14 w-148`,
  opened && tw`bg-gray4 rounded-bl-0 rounded-br-0`,
]);

const ContentWrapper = tw.div`
  w-full h-full clickable truncate text-white text-center
`;

const DropdownWrapper = tw.div`
  absolute top-42 left-0 w-full py-8 px-12 bg-gray4 rounded-bl-8 rounded-br-8
  flex flex-col gap-12
`;

const TokenWrapper = tw.div`
  flex justify-between items-center
  font-r-12 text-white
`;

const Token = tw.div`
  flex-1 
`;
const Label = tw.div`
  flex-shrink-0 text-gray2
`;

const DisconnectWrapper = tw.div`
  flex-center gap-4 font-r-12 text-gray2 clickable
`;
