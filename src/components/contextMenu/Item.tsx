import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const Item = ({ text, onClick }: Props) => {
  return <Container onClick={onClick}>{text}</Container>;
}

const Container = styled.button`
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
  transition: .1s ${styles.transition};
  background-color: rgba(0,0,0,0);
  border-radius: 6px;
  cursor: pointer;
  outline: none;

  &:focus, &:hover {
    color: #fff;
    background-color: ${palette.red3};
  }
`;

interface Props {
  text: string;
  onClick: (e?: any) => void;
}

export default Item