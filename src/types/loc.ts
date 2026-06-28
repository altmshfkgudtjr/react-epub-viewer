/**
 * @type Epub CFI type
 * @example
 * "epubcfi(/6/2[titlepage1]!/4/1:0)"
 */
type EpubCFI = string;

/** @type Epub location type */
interface Loc {
  index: number;
  href: string;
  start: EpubCFI;
  end: EpubCFI;
  percentage: number;
}

export default Loc;
