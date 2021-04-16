import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'
import { mediaQuery } from 'lib/styles/media'

const Logo = () => {
	return (
		<Wrapper href="https://github.com/altmshfkgudtjr/react-epub-viewer" target="__blank__">
			<Img src="/react-epub-viewer/images/logo.png" alt="Logo" />
		</Wrapper>
	);
}

const Wrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	margin-left: 16px;
	background-color: rgba(0,0,0,0);
	transition: .2s ${styles.transition};
	border-radius: 8px;
	padding: 4px 8px;
	cursor: pointer;

	${mediaQuery(700)} {
		display: none;
	}

	&:focus, &:hover {
		background-color: ${palette.blue0};
	}
`;

const Img = styled.img`
	height: 44px;
`;

export default Logo