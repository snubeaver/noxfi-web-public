import type { Meta, StoryObj } from '@storybook/react';

import App from './app';

const meta = {
  title: 'Components/App',
  component: App,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _App: Story = {
  args: {},
};
