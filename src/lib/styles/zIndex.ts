export const zIndexSet = (layer: number): string => `
	${layer}
`;

const zIndex = {
	header: zIndexSet(5),
	menu: zIndexSet(10),
	modal: zIndexSet(100),
	snackbar: zIndexSet(400),
	tooltip: zIndexSet(500)
};

export default zIndex;