import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const Item = ({ text }: Props) => {
  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > span {
    color: ${palette.gray4};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface Props {
  text: string;
}

export default Item;