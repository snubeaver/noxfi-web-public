import type { Meta, StoryObj } from '@storybook/react';
import tw, { styled } from 'twin.macro';

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
    <Wrapper>
      <DropdownProfile />
    </Wrapper>
  ),
  args: {},
};

const Wrapper = styled.div(() => [tw`relative h-200`]);
