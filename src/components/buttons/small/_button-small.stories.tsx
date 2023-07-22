import type { Meta, StoryObj } from '@storybook/react';

import { ButtonSmall } from '.';

const meta = {
  title: 'Components/ButtonSmall',
  component: ButtonSmall,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _ButtonSmall: Story = {
  args: {
    text: 'Text here',
    disabled: false,
    onClick: () => console.log('clicked'),
  },
};
