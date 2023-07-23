import upperFirst from 'lodash-es/upperFirst';
import { HTMLAttributes, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { formatEther } from 'viem';

import { COLOR } from '~/assets/colors';
import { ButtonSmall } from '~/components/buttons';
import { IconNext, IconNote, IconWatch, IconWatchOff } from '~/components/icons';
import { LOCALSTORAGE_KEYS } from '~/constants';
import { parseFloat, parseNumberWithComma, parseNumberWithUnit } from '~/utils/number';

import { Balance, Order, ORDER_STATUS } from '../types';

interface Props extends Order, Omit<HTMLAttributes<HTMLDivElement>, 'id'> {}
export const OrderRow = ({ note, noteHidden, from, to, status, id, ...rest }: Props) => {
  const currentOrders = useReadLocalStorage<Order[]>(LOCALSTORAGE_KEYS.ORDERS);
  const [order, setOrder] = useLocalStorage<Order[]>(LOCALSTORAGE_KEYS.ORDERS, currentOrders ?? []);
  const currentBalance = useReadLocalStorage<Balance[]>(LOCALSTORAGE_KEYS.BALANCES);
  const [balance, setBalance] = useLocalStorage<Balance[]>(
    LOCALSTORAGE_KEYS.BALANCES,
    currentBalance ?? []
  );

  const { amount: fromAmount, tokenTicker: fromTokenTicker } = from;
  const { amount: toAmount, tokenTicker: toTokenTicker } = to;

  const [shown, show] = useState(noteHidden);
  const toggle = () => show(!shown);

  const parsedFromToken = Number(parseFloat(Number(formatEther(BigInt(fromAmount))), 4));
  const parsedFromAmount =
    parsedFromToken > 1000000
      ? parseNumberWithUnit(parsedFromToken)
      : parseNumberWithComma(parsedFromToken);

  const parsedToToken = Number(parseFloat(Number(formatEther(BigInt(toAmount))), 4));
  const parsedToAmount =
    parsedToToken > 1000000
      ? parseNumberWithUnit(parsedToToken)
      : parseNumberWithComma(parsedToToken);

  const array = [...new Array(8)].map((_, i) => i + 1);

  const handleClaim = () => {
    const filteredOrder = order.filter(o => o.id !== id);
    setOrder(filteredOrder);

    const addedBalance = balance.concat({
      id: Date.now(),
      note: note,
      noteHidden: true,
      balance: to,
    });
    setBalance(addedBalance);

    alert('successfully claim matched balance');
  };

  const handleRefund = () => {
    const filteredOrder = order.filter(o => o.id !== id);
    setOrder(filteredOrder);
    alert('successfully refund balance');
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
      <BalanceWrapper>
        {`${parsedFromAmount} ${fromTokenTicker.toUpperCase()}`}
        <IconNext width={16} height={16} color={COLOR.GRAY2} />
        {`${parsedToAmount} ${toTokenTicker.toUpperCase()}`}
      </BalanceWrapper>
      <StatusWrapper>
        <StatusText status={status}>{upperFirst(status.toLowerCase())}</StatusText>
        {status === ORDER_STATUS.MATCHED && (
          <ButtonSmall text="Claim" style={{ width: '72px' }} onClick={handleClaim} />
        )}
        {status === ORDER_STATUS.CANCELED && (
          <ButtonSmall text="Refund" style={{ width: '72px' }} onClick={handleRefund} />
        )}
      </StatusWrapper>
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
  font-sb-14 text-white text-center flex-center flex-1 gap-8
`;
const StatusWrapper = tw.div`
  flex-center gap-16 w-173
`;

interface StatusTextWrapper {
  status: ORDER_STATUS;
}
const StatusText = styled.div<StatusTextWrapper>(({ status }) => [
  tw` font-sb-14`,
  status === ORDER_STATUS.ORDERED && tw`text-yellow`,
  status === ORDER_STATUS.MATCHED && tw`text-blue`,
  status === ORDER_STATUS.CANCELED && tw`text-red`,
  status === ORDER_STATUS.DONE && tw`text-white`,
]);
