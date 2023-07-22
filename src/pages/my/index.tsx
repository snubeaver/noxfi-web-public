import tw from 'twin.macro';

import { Gnb } from '~/components/gnb';

import { BalanceHeader } from './components/balance-header';
import { BalanceRow } from './components/balance-row';
import { balances } from './data';

const MyPage = () => {
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
            {balances.map(({ id, ...rest }) => (
              <BalanceRow key={id} {...rest} />
            ))}
          </TableWrapper>
        </PositionWrapper>

        <PositionWrapper>
          <PositionLabel>Orders</PositionLabel>
          <TableWrapper></TableWrapper>
        </PositionWrapper>
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

export default MyPage;
