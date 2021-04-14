/**
 * @type Selection 타입
 * @param update Highlight 클릭 진입 여부
 * @param x Contextmenu X 좌표
 * @param y Contextmenu Y 좌표
 * @param height Selection 높이
 * @param cfiRange 선택된 cfi 범위
 * @param content 선택된 텍스트
 */
interface Selection {
	update: boolean;
	x: number;
	y: number;
	height: number;
	cfiRange: string;
	content: string;
}

export default Selection