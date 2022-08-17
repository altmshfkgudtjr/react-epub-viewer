/**
 * @type Page
 * @param chapterName 현재 챕터
 * @param currentpage 현재 페이지
 * @param totalPage 총 페이지 수
 * @param startCfi 현재 페이지 시작 CFI
 * @param endCfi 현재 페이지 끝 CFI
 * @param base 현재 페이지 CFI base
 */
interface Page {
  chapterName: string;
  currentPage: number;
  totalPage: number;
  startCfi: string;
  endCfi: string;
  base: string;
}

export default Page;
