import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const SortedBtn = ({ text, isSelected, onClick }: Props) => {  
  return <Btn isSelected={isSelected} onClick={onClick}>{text}</Btn>;
}

const Btn = styled.button<{isSelected: boolean}>`
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin-left: 16px;
  color: ${({isSelected}) => isSelected 
    ? palette.blue3
    : palette.gray4
  };
  transition: .2s ${styles.transition};
  
  &:hover {
    color: ${palette.blue3};
  }
`;

interface Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default SortedBtn