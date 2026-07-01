import styled, { css } from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const ThemeItem = ({ name, color, backgroundColor, isSelected, onClick }: Props) => {
  const onClickBtn = (e: any) => {
    onClick();
    e.target.blur();
  };

  return (
    <Btn
      onClick={onClickBtn}
      isSelected={isSelected}
      title={name}
      bg={backgroundColor}
      fg={color}
    >
      Aa
    </Btn>
  );
}

const Btn = styled.button<{
  isSelected: boolean;
  bg?: string;
  fg?: string;
}>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  background-color: ${({ bg }) => bg || palette.white};
  color: ${({ fg }) => fg || palette.gray7};
  border: 2px solid ${({ isSelected }) => isSelected ? palette.blue4 : palette.gray1};
  box-shadow: ${({ isSelected }) => isSelected
    ? `0 0 0 2px ${palette.blue1}`
    : 'none'
  };
  transition: .15s ${styles.transition};

  ${({ isSelected }) => !isSelected && css`
    &:hover, &:focus {
      border-color: ${palette.blue2};
    }
  `};
`;

interface Props {
  name: string;
  color?: string;
  backgroundColor?: string;
  isSelected: boolean;
  onClick: () => void;
}

export default ThemeItem
