/**
 * @type 하이라이트 타입
 * @param key 식별값 (paragraphCfi + cfiRange)
 * @param accessTime 접근 시간
 * @param createTime 생성 시간
 * @param color 하이라이트 색상 (HEX 값)
 * @param paragraphCfi 하이라이트 단락 CFI
 * @param cfiRange 하이라이트 CFI 범위
 * @param chapterName 하이라이트 챕터명
 * @param pageNum 하이라이트 페이지
 * @param content 하이라이트 텍스트
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
 * @type 색상 타입
 * @param name 색상명
 * @param code 색상 Hex 코드
 */
export interface Color {
  name: string;
  code: string;
}

export default Highlight;
