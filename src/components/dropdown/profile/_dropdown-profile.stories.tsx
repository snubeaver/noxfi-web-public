import type { Meta, StoryObj } from '@storybook/react';
import { Web3Modal } from '@web3modal/react';
import tw, { styled } from 'twin.macro';
import { WagmiConfig } from 'wagmi';

import { ethereumClient, projectId, wagmiConfig } from '~/configs/setup-wallet';

import { DropdownProfile } from '.';

const meta = {
  title: 'Components/DropdownProfile',
  component: DropdownProfile,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropdownProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _DropdownProfile: Story = {
  render: () => (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Wrapper>
          <DropdownProfile />
        </Wrapper>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  ),
  args: {},
};

const Wrapper = styled.div(() => [tw`relative h-200`]);
