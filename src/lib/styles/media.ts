export const mediaQuery = (maxWidth: number): string => `
	@media (max-width: ${maxWidth}px)
`;

export const mediaValue = {
	xlarge: 1600,
	large: 1440,
	medium: 1200,
	small: 702,
	xsmall: 350	
};

type Media = {
	xlarge : string,
	large : string,
	medium : string,
	small : string,
	xsmall : string,
	custom : (maxWidth: number) => string
}

const media: Media = {
	xlarge : mediaQuery(mediaValue.xlarge),
	large : mediaQuery(mediaValue.large),
	medium : mediaQuery(mediaValue.medium),
	small : mediaQuery(mediaValue.small),
	xsmall : mediaQuery(mediaValue.xsmall),
	custom : mediaQuery,
};

export default media;