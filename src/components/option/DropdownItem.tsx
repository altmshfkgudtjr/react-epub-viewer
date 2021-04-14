import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'

const DropdownItem = ({ value, onClick }: Props) => {
const text = value === "Origin" ? "Original" : value;

  return <Container onClick={onClick}>{text}</Container>;
}

const Container = styled.button`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 16px;
  transition: .1s ${styles.transition};
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
  text-align: left;
  outline: none;
  
  &:focus, &:hover {
    background-color: rgba(0,0,0,.05);
  }
`;

interface Props {
  value: string;
  onClick: () => void;
}

export default DropdownItem