import styled from 'styled-components'

const Post = styled.div<{ color: string }>`
  position: relative;
  font-size: 14px;
  margin-top: 16px;
  padding: 8px;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${({ color }) => color};
    opacity: .3;
    border-radius: 8px;
    mix-blend-mode: multiply;
  }
`;

export default Post