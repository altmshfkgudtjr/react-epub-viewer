import styled from 'styled-components'

const EpubViewerWrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	margin: 0 auto;
	
	& > div {
		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

export default EpubViewerWrapper