import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const ColorItem = ({ name, color, onClick }: Props) => {
  const onClickItem = (e: any) => {
    onClick();
    e.target.blur();
  };

  return (
    <Wrapper onClick={onClickItem}>
      <ColorWrapper>
        <Color color={color} />
      </ColorWrapper>
      <Message>{name}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(0,0,0,0);
  transition: .1s ${styles.transition};
  outline: none;

  &:hover, &:focus {
    background-color: ${palette.blue3};

    & > span {
      color: #fff;
    }
  }
`;

const ColorWrapper = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: #fff;
  margin-right: 16px;
`;

const Color = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${({ color }) => color};
  opacity: .4;
`;

const Message = styled.span`
  width: 48px;
  font-size: 14px;
  color: #ddd;
  line-height: 20px;
`;

interface Props {
  name: string;
  color: string;
  onClick: () => void;
}

export default ColorItem