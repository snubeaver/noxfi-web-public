import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '.';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    unit: { control: 'text' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _TextField: Story = {
  args: {
    placeholder: '0.0',
    label: 'price',
    unit: 'DAI',
  },
};
