import type { Meta, StoryObj } from '@storybook/react';

import { ButtonMedium } from '.';

const meta = {
  title: 'Components/ButtonMedium',
  component: ButtonMedium,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonMedium>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _ButtonMedium: Story = {
  args: {
    text: 'Text here',
    isLoading: false,
    disabled: false,
    onClick: () => console.log('clicked'),
  },
};
