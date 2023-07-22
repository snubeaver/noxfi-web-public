import { HTMLAttributes, useState } from 'react';
import tw from 'twin.macro';
import { formatEther } from 'viem';

import { COLOR } from '~/assets/colors';
import { ButtonSmall } from '~/components/buttons';
import { IconNote, IconWatch, IconWatchOff } from '~/components/icons';
import { parseFloat, parseNumberWithComma } from '~/utils/number';

import { Balance } from '../types';

interface Props extends Omit<Balance, 'id'>, HTMLAttributes<HTMLDivElement> {}
export const BalanceRow = ({ note, noteHidden, balance, ...rest }: Props) => {
  const { amount, tokenTicker } = balance;

  const [shown, show] = useState(noteHidden);
  const toggle = () => show(!shown);

  const parsedAmount = parseNumberWithComma(Number(parseFloat(Number(formatEther(amount)), 4)));
  const array = [...new Array(8)].map((_, i) => i + 1);

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
        <ButtonSmall text="Withdraw" />
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
  flex font-r-14 text-white
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
