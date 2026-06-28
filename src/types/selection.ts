/**
 * @type Selection type
 * @param update Whether entered by clicking an existing highlight
 * @param x Context menu X coordinate
 * @param y Context menu Y coordinate
 * @param height Selection height
 * @param cfiRange Selected cfi range
 * @param content Selected text
 */
interface Selection {
  update: boolean;
  x: number;
  y: number;
  height: number;
  cfiRange: string;
  content: string;
}

export default Selection;
