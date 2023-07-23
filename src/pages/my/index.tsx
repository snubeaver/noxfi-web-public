import tw from 'twin.macro';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

import { Gnb } from '~/components/gnb';
import { LOCALSTORAGE_KEYS } from '~/constants';

import { BalanceHeader } from './components/balance-header';
import { BalanceRow } from './components/balance-row';
import { OrderHeader } from './components/order-header';
import { OrderRow } from './components/order-row';
import { Balance, Order, ORDER_STATUS } from './types';

const MyPage = () => {
  const currentBalances = useReadLocalStorage<Balance[]>(LOCALSTORAGE_KEYS.BALANCES) ?? [];
  const currentOrders = useReadLocalStorage<Order[]>(LOCALSTORAGE_KEYS.ORDERS) ?? [];
  const [orders, setOrders] = useLocalStorage<Order[]>(LOCALSTORAGE_KEYS.ORDERS, currentOrders);

  const handleReveal = () => {
    const length = orders.length;
    if (length === 0) return;

    if (length === 1) {
      setOrders([
        {
          ...currentOrders[0],
          status: ORDER_STATUS.MATCHED,
        },
      ]);
      return;
    }

    // 2개 이상일때 하나만 canceled
    const randomIdx = Math.floor(Math.random() * orders.length);
    const newOrders = orders.map((order, idx) => {
      if (idx === randomIdx) {
        return { ...order, status: ORDER_STATUS.CANCELED };
      }
      return { ...order, status: ORDER_STATUS.MATCHED };
    });

    setOrders(newOrders);
  };

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
              <BalanceRow key={id} id={id} {...rest} />
            ))}
          </TableWrapper>
        </PositionWrapper>

        <PositionWrapper>
          <PositionLabel>Orders</PositionLabel>
          <TableWrapper>
            <OrderHeader />
            <Divider />
            {orders.map(({ id, ...rest }) => (
              <OrderRow key={id} id={id} {...rest} />
            ))}
          </TableWrapper>
        </PositionWrapper>
        <Refresh onClick={() => handleReveal()}>{'Get Result'}</Refresh>
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
