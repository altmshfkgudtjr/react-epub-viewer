import styled from 'styled-components'
// icons
import { PrevIcon, NextIcon } from 'lib/svg'
// lib
import * as styles from 'lib/styles/styles'

const MoveBtn = ({ type, onClick }: Props) => {
  const Icon = type === "PREV"
    ? PrevIcon
    : NextIcon;
  
  const msg = type === "PREV"
    ? "이전 페이지"
    : "다음 페이지";

  return (
    <Container onClick={onClick} title={msg}>
      <Content>
        <Icon />
      </Content>
    </Container>
  );
}

const Container = styled.button`
  min-width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  &:focus, &:hover {
    filter: invert(40%) sepia(85%) saturate(1256%) hue-rotate(210deg) brightness(113%) contrast(101%);
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .1s ${styles.transition};

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

interface Props {
  type: "PREV" | "NEXT"
  onClick: () => void;
}

export default MoveBtn;