/**
 * @type Epub CFI 타입
 * @example
 * "epubcfi(/6/2[titlepage1]!/4/1:0)"
 */
type EpubCFI = string;

/** @type Epub 위치 타입 */
interface Loc {
  index: number;
  href: string;
  start: EpubCFI;
  end: EpubCFI;
  percentage: number;
}

export default Loc;
