import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'
import * as styles from 'lib/styles/styles'

const Wrapper = styled.button`
  padding: 16px 24px;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${palette.gray0};
  transition: .1s ${styles.transition};
  cursor: pointer;
  outline: none;
  text-align: left;
  
  &:last-child {
    box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
  }

  & > div {
    color: inherit;
    flex-grow: 1;
  }

  &:hover > *, &:focus > * {
    color: ${palette.blue3};
  }
`;

export default Wrapper