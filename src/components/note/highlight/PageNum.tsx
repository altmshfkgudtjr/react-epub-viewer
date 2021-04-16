import styled from 'styled-components'
// lib
import palette from 'lib/styles/palette'

const PageNum = ({ num }: Props) => {
  return <Content>{num}p</Content>
}

const Content = styled.span`
  min-width: 32px;
  margin-right: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${palette.gray4};
`;

interface Props {
  num: number;
}

export default PageNum