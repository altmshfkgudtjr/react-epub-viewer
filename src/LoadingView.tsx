import styled, { keyframes } from 'styled-components'

const LoadingView = () => {
  return (
    <LoadingWrapper>
      <Wrapper>
        <Content />
      </Wrapper>
    </LoadingWrapper>
  );
}

const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 30px;
	margin: 30px 0;
	text-align: center;
`;

const Content = styled.div`
	display: inline-block;
	width: 30px;
	height: 30px;
	border: 3px solid #ebf1ff;
	border-radius: 50%;
	border-top-color: #3972ff;
	animation: ${spin} 1s ease-in-out infinite;
`;

export default LoadingView