import { ButtonHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export const ButtonSmall = ({ text, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TextWrapper>{text}</TextWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.button`
  h-32 px-16 py-6 flex-center relative
  rounded-8 bg-gray4 clickable
  hover:(bg-gray3)
  disabled:(bg-gray2 non-clickable hover:(bg-gray2))
`;

const TextWrapper = tw.div`
  font-sb-12 text-white
  disabled:(text-gray5)
`;
