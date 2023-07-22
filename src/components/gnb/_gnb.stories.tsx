import type { Meta, StoryObj } from '@storybook/react';
import { Web3Modal } from '@web3modal/react';
import { BrowserRouter } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';
import { WagmiConfig } from 'wagmi';

import { ethereumClient, projectId, wagmiConfig } from '~/configs/setup-wallet';

import { Gnb } from '.';

const meta = {
  title: 'Components/Gnb',
  component: Gnb,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Gnb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Gnb: Story = {
  render: () => (
    <>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Wrapper>
            <Gnb />
          </Wrapper>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  ),
  args: {},
};

const Wrapper = styled.div(() => [
  tw`relative w-full bg-black h-800`,
  css`
    & > div {
      position: absolute !important;
    }
  `,
]);
