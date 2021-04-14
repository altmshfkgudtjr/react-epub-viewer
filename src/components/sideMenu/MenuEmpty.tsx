import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const MenuEmpty = ({ text }: Props) => {
  return <Content>{text}</Content>;
}

const Content = styled.div`
  flex-grow: 1;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.blue2};
  font-size: 14px;
`;

interface Props {
  text: string;
}

export default MenuEmpty