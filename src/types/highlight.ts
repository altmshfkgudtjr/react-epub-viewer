/**
 * @type Highlight type
 * @param key Identifier (paragraphCfi + cfiRange)
 * @param accessTime Access time
 * @param createTime Creation time
 * @param color Highlight color (HEX value)
 * @param paragraphCfi Highlight paragraph CFI
 * @param cfiRange Highlight CFI range
 * @param chpaterName Highlight chapter name
 * @param pageNum Highlight page number
 * @param content Highlight text
 */
interface Highlight {
  key: string;
  accessTime: string;
  createTime: string;
  color: string;
  paragraphCfi: string;
  cfiRange: string;
  chpaterName: string;
  pageNum: number;
  content: string;
}

/**
 * @type Color type
 * @param name Color name
 * @param code Color hex code
 */
export interface Color {
  name: string;
  code: string;
}

export default Highlight;
