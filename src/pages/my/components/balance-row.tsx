import { HTMLAttributes, useState } from 'react';
import tw from 'twin.macro';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { formatEther } from 'viem';

import { COLOR } from '~/assets/colors';
import { ButtonSmall } from '~/components/buttons';
import { IconNote, IconWatch, IconWatchOff } from '~/components/icons';
import { LOCALSTORAGE_KEYS } from '~/constants';
import { parseFloat, parseNumberWithComma, parseNumberWithUnit } from '~/utils/number';

import { Balance } from '../types';

interface Props extends Balance, Omit<HTMLAttributes<HTMLDivElement>, 'id'> {}
export const BalanceRow = ({ note, noteHidden, balance, id, ...rest }: Props) => {
  const { amount, tokenTicker } = balance;

  const currentBalance = useReadLocalStorage<Balance[]>(LOCALSTORAGE_KEYS.BALANCES);
  const [balances, setBalances] = useLocalStorage<Balance[]>(
    LOCALSTORAGE_KEYS.BALANCES,
    currentBalance ?? []
  );

  const [shown, show] = useState(noteHidden);
  const toggle = () => show(!shown);

  const parsedToken = Number(parseFloat(Number(formatEther(BigInt(amount))), 4));
  const parsedAmount =
    parsedToken > 1000000 ? parseNumberWithUnit(parsedToken) : parseNumberWithComma(parsedToken);

  const array = [...new Array(8)].map((_, i) => i + 1);

  const handleWithdraw = () => {
    alert('successfully withdraw balance ');

    const filtered = balances.filter(b => b.id !== id);
    setBalances(filtered);
  };

  return (
    <Wrapper {...rest}>
      <NoteWrapper>
        <Note>
          {shown
            ? array.map(i => <IconNote key={i} width={8} height={8} color={COLOR.WHITE} />)
            : note}
        </Note>
        <HideWrapper onClick={toggle}>
          {shown ? <IconWatch color={COLOR.GRAY3} /> : <IconWatchOff color={COLOR.GRAY3} />}
        </HideWrapper>
      </NoteWrapper>
      <BalanceWrapper>{`${parsedAmount} ${tokenTicker.toUpperCase()}`}</BalanceWrapper>
      <ButtonWrapper>
        <ButtonSmall text="Withdraw" onClick={handleWithdraw} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-full flex gap-8 items-center
`;
const NoteWrapper = tw.div`
  flex-center gap-4 flex-shrink-0 w-200
`;
const Note = tw.div`
  flex font-r-14 text-white overflow-auto scrollbar-hide
`;
const HideWrapper = tw.div`
  flex-center flex-shrink-0 clickable
`;
const BalanceWrapper = tw.div`
  font-sb-14 text-white text-center flex-1
`;
const ButtonWrapper = tw.div`
  w-87 flex-shrink-0
`;
