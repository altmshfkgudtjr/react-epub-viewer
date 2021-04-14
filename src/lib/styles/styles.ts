export const noselect = (): string => `
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const transition = (): string =>`
	cubic-bezier(0.25, 0.1, 0.25, 1);
`;

export const boxShadow = {
	light: "0px 4px 16px rgba(0, 0, 0, 0.04)",
	regular: "0px 8px 12px rgba(0, 0, 0, 0.2)",
	bold: "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 8px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)"
};

export const scrollbar = (width=8) => `
	&::-webkit-scrollbar {
		width: ${width}px;
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background: #ddd;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb:hover {
		background: #ccc;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
`