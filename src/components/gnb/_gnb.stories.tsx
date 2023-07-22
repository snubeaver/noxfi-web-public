import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';

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
    <BrowserRouter>
      <Wrapper>
        <Gnb />
      </Wrapper>
    </BrowserRouter>
  ),
  args: {},
};

const Wrapper = styled.div(() => [
  tw`relative w-full bg-black h-300`,
  css`
    & > div {
      position: absolute !important;
    }
  `,
]);
