import { keyframes } from 'styled-components';

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1;}
`;
const fadeOut = keyframes`
	0% { opacity: 1; }
	100% { opacity: 0; }
`;
const fadeInTop = keyframes`
	0% { opacity: 0; transform: translateY(-40px); }
	100% { opacity: 1; transform: translateY(0); }
`;
const fadeOutTop = keyframes`
	0% { opacity: 1; transform: translateY(0); }
	100% { opacity: 0; transform: translateY(-40px); }
`;
const fadeInBottom = keyframes`
	0% { opacity: 0; transform: translateY(40px); }
	100% { opacity: 1; transform: translateY(0); }
`;
const fadeOutBottom = keyframes`
	0% { opacity: 1; transform: translateY(0); }
	100% { opacity: 0; transform: translateY(40px); }
`;
const fadeInLeft = keyframes`
	0% { opacity: 0; transform: translateX(-40px); }
	100% { opacity: 1; transform: translateX(0); }
`;
const fadeOutLeft = keyframes`
	0% { opacity: 1; transform: translateX(0); }
	100% { opacity: 0; transform: translateX(-40px); }
`;
const fadeInRight = keyframes`
	0% { opacity: 0; transform: translateX(40px); }
	100% { opacity: 1; transform: translateX(0); }
`;
const fadeOutRight = keyframes`
	0% { opacity: 1; transform: translateX(0); }
	100% { opacity: 0; transform: translateX(40px); }
`;
const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

const animations = {
	fadeIn,
	fadeOut,
	fadeInTop,
	fadeOutTop,
	fadeInBottom,
	fadeOutBottom,
	fadeInLeft,
	fadeOutLeft,
	fadeInRight,
	fadeOutRight,
	spin
};

export default animations