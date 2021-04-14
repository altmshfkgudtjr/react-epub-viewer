import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const OptionValue = styled.span<{ active: boolean }>`
  display: inline-block;
  font-size: 14px;
  color: ${props => props.active
    ? palette.blue3
    : palette.gray4
  };
  margin-right: 8px;
  width: 40px;
  text-align: right;
  line-height: 20px;
`;

export default OptionValue