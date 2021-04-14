import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const VerticalLine = ({ height=16 }: Props) => {
  return <Bar height={height} />
}

const Bar = styled.div<{height: number}>`
  width: 1px;
  height: ${({height}) => height+'px'};
  margin: 0 8px;
  background-color: ${palette.gray2};
`;

interface Props {
  height?: number
}

export default VerticalLine