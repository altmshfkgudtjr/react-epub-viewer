import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'
// icons
import { DownIcon } from 'lib/svg'

const DropdownValue = ({ value, isDropdown, onClick }: Props) => {
  return (
    <Container 
      onClick={onClick}
      isDropdown={isDropdown}
      title="Select font"
    >
      <Content>{value}</Content>
      <Icon isDropdown={isDropdown}>
        <DownIcon />
      </Icon>
    </Container>
  );
}

const Container = styled.button<{isDropdown: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 40px;
  background-color: ${palette.white};
  border: ${({isDropdown}) => isDropdown
    ? `2px solid ${palette.blue3}`
    : `2px solid ${palette.gray1}`
  };
  border-radius: ${({isDropdown}) => isDropdown
    ? "20px 20px 0 0"
    : "20px"
  };
  box-sizing: border-box;
  padding: 0px 16px;
  cursor: pointer;
  z-index: 4;
  transition: .1s ${styles.transition};
  text-align: left;
  outline: none;

  &:hover, &:focus {
    border: 2px solid ${palette.blue3};

    & > div {
      opacity: 1;
      filter: invert(40%) sepia(85%) saturate(1256%) hue-rotate(210deg) brightness(113%) contrast(101%);
    }
  }
`;

const Content = styled.span`
  flex-grow: 1;
  margin-right: 16px;
  font-size: 14px;
`;

const Icon = styled.div<{isDropdown: boolean}>`
  display: flex;
  width: 12px;
  height: 12px;
  opacity: .3;
  
  & > svg {
    transform-origin: center;
    transform: ${({isDropdown}) => isDropdown
      ? 'rotate(180deg)'
      : 'rotate(0deg)'
    };
  }
`;

interface Props {
  value: string;
  isDropdown: boolean;
  onClick: (e: any) => void;
}

export default DropdownValue