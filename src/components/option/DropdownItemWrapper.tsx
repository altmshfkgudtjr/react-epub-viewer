import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'

const DropdownItemWrapper = ({ show, children }: Props) => {
  return <Container show={show}>{children}</Container>
}

const Container = styled.div<{show: boolean}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 0 16px 0;
  background-color: ${palette.white};
  border: 2px solid ${palette.blue3};
  z-index: 3;
  border-radius: ${({show}) => show
    ? '0 0 20px 20px'
    : '20px'
  };
  transition: .4s ${styles.transition};
  opacity: ${({show}) => show
    ? '1'
    : '0'
  };
  transform-origin: top;
  transform: ${({show}) => show
    ? 'translateY(-2px) scaleY(1);'
    : 'translateY(-40px) scaleY(0);'
  };
  ${styles.scrollbar(6)}
  ${({show}) => show
    ? ''
    : styles.noselect
  };
`;

interface Props {
  show: boolean;
  children: React.ReactElement[];
}

export default DropdownItemWrapper