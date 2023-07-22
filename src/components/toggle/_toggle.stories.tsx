import type { Meta, StoryObj } from '@storybook/react';
import tw from 'twin.macro';

import { IconNext } from '../icons';
import { Toggle } from '.';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Toggle: Story = {
  args: {
    left: {
      id: 'left',
      text: 'Left',
      selected: false,
      handler: (id: string) => console.log(id),
    },
    right: {
      id: 'right',
      text: 'Right',
      selected: false,
      handler: (id: string) => console.log(id),
    },
  },
};

const TextIconWrapper = tw.div`
  font-sb-20 flex-center gap-8
`;
export const _ToggleWithIcon = {
  render: () => (
    <Toggle
      left={{
        id: 'left',
        text: (
          <TextIconWrapper>
            ETH
            <IconNext />
            DAI
          </TextIconWrapper>
        ),
        selected: false,
        handler: (id: string) => console.log(id),
      }}
      right={{
        id: 'right',
        text: (
          <TextIconWrapper>
            ETH
            <IconNext />
            DAI
          </TextIconWrapper>
        ),
        selected: false,
        handler: (id: string) => console.log(id),
      }}
    />
  ),
};
