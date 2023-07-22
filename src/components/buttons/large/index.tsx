import lottie from 'lottie-web';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';

import loading from '~/assets/lottie/loading.json';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  stretch?: boolean;
}
export const ButtonLarge = ({ text, isLoading, stretch = true, onClick, ...rest }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current || !isLoading) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isLoading]);

  return (
    <Wrapper
      isLoading={isLoading}
      stretch={stretch}
      onClick={isLoading ? undefined : onClick}
      {...rest}
    >
      <TextWrapper isLoading={isLoading}>{text}</TextWrapper>
      <LottieWrapper ref={warpperRef} />
    </Wrapper>
  );
};

interface WrapperProps {
  isLoading?: boolean;
  stretch?: boolean;
}
const Wrapper = styled.button<WrapperProps>(({ isLoading, stretch }) => [
  tw`
    px-32 py-16 flex-center relative
    rounded-8 bg-yellow clickable
    hover:(bg-light-yellow)
    disabled:(bg-gray2 non-clickable hover:(bg-gray2))
  `,
  isLoading && tw`non-clickable`,
  stretch && tw`w-full`,
]);

const TextWrapper = styled.div<WrapperProps>(({ isLoading }) => [
  tw`
    font-sb-18 text-black
    disabled:(text-gray5)
  `,
  isLoading && tw`opacity-0`,
]);
const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;
