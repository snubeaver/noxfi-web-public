import { HTMLAttributes, ReactNode, useState } from 'react';
import tw, { css, styled } from 'twin.macro';

interface ToggleProps {
  id: string;
  text: ReactNode;
  selected?: boolean;
  handler?: (id: string) => void;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  left: ToggleProps;
  right: ToggleProps;
}

export const Toggle = ({ left, right, ...rest }: Props) => {
  const { id: leftId, text: leftText, selected: leftSelected, handler: leftHandler } = left;
  const { id: rightId, text: rightText, selected: rightSelected, handler: rightHandler } = right;

  const defaultSelected = rightSelected ? rightId : leftSelected ? leftId : leftId;
  const [selected, select] = useState(defaultSelected);

  return (
    <Wrapper {...rest}>
      <ToggleWrapper
        selected={selected === leftId}
        onClick={() => {
          select(leftId);
          leftHandler?.(leftId);
        }}
      >
        {leftText}
      </ToggleWrapper>
      <ToggleWrapper
        selected={selected === rightId}
        onClick={() => {
          select(rightId);
          rightHandler?.(rightId);
        }}
      >
        {rightText}
      </ToggleWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  p-8 flex-center gap-8 rounded-40 bg-gray5
`;

interface ToggleButtonProps {
  selected?: boolean;
}
const ToggleWrapper = styled.div<ToggleButtonProps>(({ selected }) => [
  tw`flex-1 flex-shrink-0 px-40 py-12 select-none flex-center rounded-32 bg-gray5 font-sb-20 text-gray3 clickable`,

  selected && tw`text-black bg-white`,
  selected
    ? css`
        & svg path {
          fill: #000;
        }
      `
    : css`
        & svg path {
          fill: #6d7684;
        }
      `,
]);
