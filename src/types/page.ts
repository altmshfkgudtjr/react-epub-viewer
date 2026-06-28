/**
 * @type Page
 * @param chapterName Current chapter
 * @param currentPage Current page
 * @param totalPage Total number of pages
 * @param startCfi Start CFI of current page
 * @param endCfi End CFI of current page
 * @param base CFI base of current page
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
