import styled from 'styled-components'
// components
import OptionWrapper from 'components/option/OptionWrapper'
import OptionTitle from 'components/option/OptionTitle'
import OptionValue from 'components/option/OptionValue'
import SliderValue from 'components/option/SliderValue'

const Slider = ({
  active,
  title,
  minValue,
  maxValue,
  defaultValue,
  step,
  onChange
}: Props) => {
  const onChangeValue = (e: any) => {
    if (!active) return;
    onChange(e);
  }
  
  
  return (
    <OptionWrapper>
      <OptionTitle>{title}</OptionTitle>
      
      <SliderWrapper>
        <OptionValue active={active}>{defaultValue}</OptionValue>
        <SliderValue active={active}
                     minValue={minValue}
                     maxValue={maxValue}
                     defaultValue={defaultValue}
                     step={step}
                     onChange={onChangeValue} />
      </SliderWrapper>
    </OptionWrapper>
  );
}

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

interface Props {
  active: boolean;
  title: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
  onChange: (e: any) => void;
}

export default Slider