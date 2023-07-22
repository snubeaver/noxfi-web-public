import tw from 'twin.macro';

export const BalanceHeader = () => {
  return (
    <Wrapper>
      <HeaderText style={{ width: '200px' }}>Note</HeaderText>
      <HeaderText style={{ flexGrow: 1 }}>Balance</HeaderText>
      <HeaderText style={{ width: '103px' }} />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-full flex gap-8
`;

const HeaderText = tw.div`
  font-sb-14 text-white text-center
`;
