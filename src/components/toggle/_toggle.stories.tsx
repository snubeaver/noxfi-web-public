import type { Meta, StoryObj } from '@storybook/react';

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
