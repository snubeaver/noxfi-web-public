import { useWeb3Modal, Web3Button } from '@web3modal/react';
import tw from 'twin.macro';

const App = () => {
  const { open, close } = useWeb3Modal();

  return (
    <Wrapper>
      <Web3Button />
      <button onClick={() => open()}>test button</button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  bg-black text-white
`;

export default App;
