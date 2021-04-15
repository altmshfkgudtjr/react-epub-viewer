import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
// icons
import { CloseIcon } from 'lib/svg'

const CloseBtn = ({ onClick }: Props) => {
  return (
    <Btn onClick={onClick}>
      <Icon />
    </Btn>
  );
}

const Btn = styled.button`
  position: relative;
  height: 100%;
  padding: 0 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .1s ${styles.transition};
  outline: none;

  &:focus, &:hover {
    filter: invert(40%) sepia(85%) saturate(1256%) hue-rotate(210deg) brightness(113%) contrast(101%);
  }
`;

const Icon = styled(CloseIcon)`
  width: 18px;
  height: 18px;
`;

interface Props {
  onClick: () => void;
}

export default CloseBtn;