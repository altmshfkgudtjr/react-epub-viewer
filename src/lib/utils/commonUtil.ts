import { EpubCFI } from 'epubjs'
// types
import { BookStyle, BookFlow } from 'types/book'


/**
 * DateTime to `yyyy-mm-dd`
 * @param {Date} time 
 */
 export const timeFormatter = (time: Date): string => {
	const yyyy = time.getFullYear();
	const mm = time.getMonth() + 1;
	const dd = time.getDate();
	const msg = `${yyyy}-${mm}-${dd}`;

	return msg;
}


/**
 * Comparison of two CFI sizes
 * - -1 : CFI 1 < CFI 2
 * - 0 : CFI 1 == CFI 2
 * - 1 : CFI 1 > CFI 2
 * @param cfi_1 CFI 1
 * @param cfi_2 CFI 2
 */
export const compareCfi = (cfi_1: string, cfi_2: string): number => {
	const epubcfi = new EpubCFI();
	return epubcfi.compare(cfi_1, cfi_2);
};


/**
 * Split CFI range into two starting CFI and ending CFI
 * - null : Invalid CFIRange
 * @param cfiRange CFIRange
 */
export const cfiRangeSpliter = (cfiRange: string) => {
	const content = cfiRange.slice(8, -1);
	const [origin, start, end] = content.split(',');

	if (!origin || !start || !end) return null;

	const startCfi = `epubcfi(${origin + start})`;
	const endCfi = `epubcfi(${origin + end})`;
	return { startCfi, endCfi }
}


/**
 * Whether the two CFI ranges nested
 * - true : Nested
 * - false : Not nested
 * - null : Invalid CFIRange
 * @param cfiRange1 First CFIRange
 * @param cfiRange2 Second CFIRange
 */
export const clashCfiRange = (baseCfiRange: string, targetCfiRange: string) => {
	const splitCfi1 = cfiRangeSpliter(baseCfiRange);
	const splitCfi2 = cfiRangeSpliter(targetCfiRange);

	if (!splitCfi1 || !splitCfi2) return null;

	const { startCfi: s1, endCfi: e1 } = splitCfi1;
	const { startCfi: s2, endCfi: e2 } = splitCfi2;

	if ((compareCfi(s2, s1) <= 0 && compareCfi(s1, e2) <= 0)
		||(compareCfi(s2, e1) <= 0 && compareCfi(e1, e2) <= 0)
		||(compareCfi(s1, s2) <= 0 && compareCfi(e2, e1) <= 0)) {
		return true;
	}
	return false;
}


/**
 * Extract paragraph CFI from CFIRange
 * - null : Invalid CFIRange
 * @param cfiRange CFIRange
 */
export const getParagraphCfi = (cfiRange: string) => {
	if (!cfiRange) return;

	const content = cfiRange.slice(8, -1);
	const [origin, start, end] = content.split(',');
	
	if (!origin || !start || !end) return null;

	const cfi = `epubcfi(${origin})`;
	return cfi;
}


/**
 * Get specific DOM Element from CFI
 * - **※ Warning**: Other Iframe must not exist in the Reader page!
 * @param cfi CFI
 * @returns HTML Element or Null
 */
export const getNodefromCfi = (cfi: string): HTMLElement | null => {
	const iframe = document.querySelector('iframe');
	if (!iframe) return null;

	const doc = iframe.contentWindow && iframe.contentWindow.document;
	if (!doc) return null;

	// Resolve the CFI through epubjs' own parser instead of walking `childNodes`
	// by hand. The previous traversal indexed `childNodes` (text nodes included)
	// as `child[idx - 1]`, which only lined up when a whitespace text node
	// happened to sit before each element. Tightly-nested markup with no such
	// sibling — e.g. `<div class="title"><h1>…</h1></div>` on a title page — made
	// it overshoot to a non-existent sibling and return null, so highlights on
	// headings/titles were registered but never drawn (#24). epubjs indexes
	// element steps against element-only children, so it is unaffected.
	try {
		const range = new EpubCFI(cfi).toRange(doc);
		if (!range) return null;

		const node = range.startContainer;
		const element = node.nodeType === Node.TEXT_NODE
			? node.parentElement
			: (node as HTMLElement);
		return element ?? null;
	} catch {
		/* Malformed CFI or node not on the current page */
		return null;
	}
}


/**
 * Selection absolute location
 * @param viewer viewerRef.current
 * @param bookStyle bookStyle
 * @param bookFlow book-flow
 * @param MIN_VIEWER_WIDTH min viewer width
 * @param MIN_VIEWER_HEIGHT min viewer height
 * @param VIEWER_HEADER_HEIGHT viewer header height
 * @param CONTEXTMENU_WIDTH contextmenu width
 * @returns Contextmenu location
 */
export const getSelectionPosition = (
	viewer: any,
	bookStyle: BookStyle,
	bookFlow: BookFlow,
	MIN_VIEWER_WIDTH: number,
	MIN_VIEWER_HEIGHT: number,
	VIEWER_HEADER_HEIGHT: number,
	CONTEXTMENU_WIDTH: number
): { x: number, y: number, height: number, width: number } | null => {
	const { 
		innerWidth: windowWidth,
		innerHeight: windowHeight 
	} = window;

	const iframeWidth = viewer.offsetWidth;

	const scrollTop = viewer.querySelector('div').scrollTop;

	const iframe = viewer.querySelector('iframe');
	const selection_ = iframe && iframe.contentWindow && iframe.contentWindow.getSelection();
	if (!selection_ || selection_.rangeCount === 0) return null;

	const range = selection_.getRangeAt(0);
	const {
		x: selectionX,
		y: selectionY,
		height: selectionHeight,
		width: selectionWidth
	} = range.getBoundingClientRect();

	const marginLeft = ~~((windowWidth - MIN_VIEWER_WIDTH) / 100 * bookStyle.marginHorizontal / 2);
	const marginTop = bookFlow === "scrolled-doc"
		? 0
		: ~~((windowHeight - VIEWER_HEADER_HEIGHT - MIN_VIEWER_HEIGHT) / 100 * bookStyle.marginVertical / 2);

	const x = ~~(selectionX % iframeWidth + marginLeft + ( selectionWidth / 2 - CONTEXTMENU_WIDTH / 2));
	const y = ~~(selectionY + selectionHeight + VIEWER_HEADER_HEIGHT + marginTop - scrollTop);

	return { 
		x, 
		y, 
		height: selectionHeight, 
		width: selectionWidth 
	};
}

/**
 * Debounce
 * @param func Target function
 * @param timeout delay
 */
 export function debounce<Params extends any[]>(
  timeout: number,
  func: (...args: Params) => any,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}