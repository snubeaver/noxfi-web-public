import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { IconLogout } from '~/components/icons';

export const DropdownProfile = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [opened, open] = useState(false);
  const toggle = () => open(!opened);

  return (
    <Wrapper ref={ref} opened={opened}>
      <ContentWrapper onClick={toggle}>{'addr...addr'}</ContentWrapper>
      {opened && (
        <DropdownWrapper>
          <TokenWrapper>
            <Token>{1000}</Token>
            <Label>{'ETH'}</Label>
          </TokenWrapper>
          <TokenWrapper>
            <Token>{1000}</Token>
            <Label>{'DAI'}</Label>
          </TokenWrapper>
          <DisconnectWrapper onClick={() => console.log('disconnect')}>
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
