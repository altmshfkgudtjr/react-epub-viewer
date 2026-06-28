/**
 * @type
 * @param coverURL Cover image url
 * @param title Title
 * @param description Description
 * @param published_date Published date
 * @param modified_date Modified date
 * @param author Author
 * @param publisher Publisher
 * @param language Book language
 */
type Book = {
  coverURL: string;
  title: string;
  description: string;
  published_date: string;
  modified_date: string;
  author: string;
  publisher: string;
  language: string;
};

/**
 * @type
 * @param fontFamily Font family
 * @param fontSize Font size
 * @param lineHeight Line height
 * @param marginHorizontal Horizontal margin
 * @param marginVertical Vertical margin
 */
export type BookStyle = {
  fontFamily: BookFontFamily;
  fontSize: number;
  lineHeight: number;
  marginHorizontal: number;
  marginVertical: number;
};

/**
 * @type
 * - Origin: Original font
 * - *: Custom font
 */
export type BookFontFamily = 'Origin' | 'Roboto';

export type BookFlow = 'paginated' | 'scrolled-doc';

/**
 * @type
 * @param flow Horizontal (paginated) or vertical (scrolled) reading
 * @param resizeOnOrientationChange Whether to resize on orientation change
 * @param spread Whether to show two-page spread
 */
export type BookOption = {
  flow: BookFlow;
  resizeOnOrientationChange: boolean;
  spread: 'auto' | 'none';
};

export default Book;
