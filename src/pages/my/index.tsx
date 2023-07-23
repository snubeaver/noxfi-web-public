import { useState } from 'react';
import tw from 'twin.macro';
import { useReadLocalStorage } from 'usehooks-ts';

import { Gnb } from '~/components/gnb';
import { LOCALSTORAGE_KEYS } from '~/constants';

import { BalanceHeader } from './components/balance-header';
import { BalanceRow } from './components/balance-row';
import { OrderHeader } from './components/order-header';
import { OrderRow } from './components/order-row';
import { matchedOrders, orders } from './data';
import { Balance, ORDER_STATUS } from './types';

const MyPage = () => {
  const currentBalances = useReadLocalStorage<Balance[]>(LOCALSTORAGE_KEYS.BALANCES) ?? [];
  const [reveal, setReveal] = useState<boolean>(false);

  return (
    <Wrapper>
      <Gnb />
      <ContentWrapper>
        <Title>MY</Title>
        <PositionWrapper>
          <PositionLabel>Balance</PositionLabel>
          <TableWrapper>
            <BalanceHeader />
            <Divider />
            {currentBalances.map(({ id, ...rest }) => (
              <BalanceRow key={id} {...rest} />
            ))}
          </TableWrapper>
        </PositionWrapper>

        <PositionWrapper>
          <PositionLabel>Orders</PositionLabel>
          <TableWrapper>
            <OrderHeader />
            <Divider />
            {reveal
              ? matchedOrders.map(({ id, status, ...rest }) => (
                  <OrderRow
                    key={id}
                    {...rest}
                    status={status ? ORDER_STATUS.MATCHED : ORDER_STATUS.MATCHED}
                  />
                ))
              : orders.map(({ id, ...rest }) => <OrderRow key={id} {...rest} />)}
          </TableWrapper>
        </PositionWrapper>
        <Refresh onClick={() => setReveal(true)}>{'Get Result'}</Refresh>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-full h-full pt-74
  flex flex-col items-center justify-between min-h-822 overflow-auto
`;
const Title = tw.div`
  font-sb-28 text-white
`;
const ContentWrapper = tw.div`
  mt-100 mb-120 w-720 flex flex-col gap-40
`;
const PositionWrapper = tw.div`
  flex flex-col gap-16
`;
const PositionLabel = tw.div`
  font-sb-20 text-yellow
`;
const TableWrapper = tw.div`
  w-full py-16 px-24 rounded-8 bg-gray5
  flex flex-col gap-16
`;
const Divider = tw.div`
  w-full h-1 flex-shrink-0 bg-gray4
`;
const Refresh = tw.button`
  clickable bg-gray5 text-white h-40 font-sb-14
`;
export default MyPage;
