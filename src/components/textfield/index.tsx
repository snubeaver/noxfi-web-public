import { InputHTMLAttributes, useCallback } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import tw from 'twin.macro';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  value?: number;
  placeholder?: string;
  handleChange?: (value: NumberFormatValues) => void;
}
export const TextField = ({
  label,
  unit,
  placeholder = '0.0',
  readOnly,
  value,
  handleChange,
}: Props) => {
  const CustomInput = useCallback(
    ({ ...rest }: Props) => (
      <Wrapper>
        <Label>{label}</Label>
        <InputWrapper>
          <Input readOnly={readOnly} {...rest}></Input>
          <Unit>{unit}</Unit>
        </InputWrapper>
      </Wrapper>
    ),
    [label, readOnly, unit]
  );

  return (
    <NumericFormat
      allowLeadingZeros={false}
      allowNegative={false}
      placeholder={placeholder}
      thousandSeparator
      onValueChange={values => handleChange?.(values)}
      value={value}
      customInput={CustomInput}
    />
  );
};

const Wrapper = tw.div`
  w-480 py-12 px-24
  flex flex-col gap-4
  bg-gray4 rounded-8
`;

const Label = tw.label`
  font-r-14 text-white
`;

const Unit = tw.div`
  font-r-28 text-gray2
`;

const InputWrapper = tw.div`
  flex gap-8
`;
const Input = tw.input`
  w-380
  font-sans font-r-28 text-white placeholder:text-gray2
  bg-transparent border-none
  caret-yellow
`;
