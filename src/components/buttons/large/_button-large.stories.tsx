import type { Meta, StoryObj } from '@storybook/react';

import { ButtonLarge } from '.';

const meta = {
  title: 'Components/ButtonLarge',
  component: ButtonLarge,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    isLoading: { control: 'boolean' },
    stretch: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _ButtonLarge: Story = {
  args: {
    text: 'Text here',
    isLoading: false,
    stretch: true,
    disabled: false,
    onClick: () => console.log('clicked'),
  },
};
