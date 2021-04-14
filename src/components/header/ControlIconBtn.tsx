import styled, { css } from 'styled-components'
// icons
import { 
  ScrollHorizontalIcon,
  ScrollVerticalIcon,
  BookCloseIcon,
  BookOpenIcon
} from 'lib/svg'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const ControlIconBtn = ({ type, alt, active, isSelected, onClick }: Props) => {
  let HeaderIcon = null;
  switch (type) {
    case "ScrollVertical":
      HeaderIcon = ScrollVerticalIcon;
      break;
    case "ScrollHorizontal":
      HeaderIcon = ScrollHorizontalIcon;
      break;
    case "BookOpen":
      HeaderIcon = BookOpenIcon;
      break;
    case "BookClose":
      HeaderIcon = BookCloseIcon;
      break;
  }
  
  const onClickBtn = () => {
    if (active) onClick();
  }

  return (
    <Btn 
      onClick={onClickBtn} 
      isSelected={isSelected}
      active={active}
      title={alt}
    >
      <Icon>
        <HeaderIcon />
      </Icon>
    </Btn>
  );
}

const Btn = styled.button<{ isSelected: boolean, active: boolean }>`
  position: relative;
  height: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  transition: .3s ${styles.transition};
  opacity: ${({active}) => active
    ? '1'
    : '.3'
  };
  cursor: ${({active}) => active
    ? 'pointer'
    : 'default'
  };
  outline: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: -1;
    border-radius: 30px;
    width: ${({isSelected}) => isSelected
      ? '32px'
      : '8px'
    };
    height: ${({isSelected}) => isSelected
      ? '32px'
      : '8px'
    };
    opacity: ${({active, isSelected}) => active && isSelected
      ? '.7'
      : '0'
    };
    transition: .1s ${styles.transition};
    background-color: ${palette.blue1};
  }

  &:focus, &:hover {
    ${({active}) => active
      ? css`
        &:before {
          width: 32px;
          height: 32px;
          opacity: 1;
        }
      `
      : ""
    };
    
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;

  & > div, & > svg {
    width: 16px;
    height: 16px;
  }
`;

type HeaderIcon = 
  "ScrollHorizontal" |
  "ScrollVertical" |
  "BookOpen" |
  "BookClose";

interface Props {
  type: HeaderIcon;
  alt: string;
  active: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default ControlIconBtn