import { useWeb3Modal } from '@web3modal/react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import logo from '~/assets/images/logo.png';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';

import { ButtonMedium } from '../buttons';
import { DropdownProfile } from '../dropdown/profile';

const MENU = [
  {
    id: 'deposit',
    text: 'Deposit',
    path: '/deposit',
  },
  {
    id: 'trade',
    text: 'Trade',
    path: '/trade',
  },
  {
    id: 'my',
    text: 'MY',
    path: '/my',
  },
];

export const Gnb = () => {
  const navigate = useNavigate();
  const { isConnected } = useConnectWallet();
  const { isOpen, open } = useWeb3Modal();

  return (
    <Wrapper>
      <LogoWrapper src={logo} alt="Nox Finance" />
      <ContentWrapper>
        {MENU.map(({ id, text, path }) => (
          <MenuWrapper key={id} onClick={() => navigate(path)}>
            {text}
          </MenuWrapper>
        ))}
        {isConnected ? (
          <DropdownProfile />
        ) : (
          <ButtonMedium text="Connect Wallet" isLoading={isOpen} onClick={open} />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  fixed top-0 left-0 w-full bg-transparent py-16 px-20
  flex items-center justify-between
`;

const LogoWrapper = tw.img`
  flex-center object-cover h-28
`;

const ContentWrapper = tw.div`
  flex items-center gap-40
`;

const MenuWrapper = tw.div`
  font-sb-20 text-white clickable
`;
