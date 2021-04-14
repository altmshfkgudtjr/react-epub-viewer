import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.white};
`;

export default Wrapper