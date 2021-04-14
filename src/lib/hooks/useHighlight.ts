import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// slices
import { pushHighlight, popHighlight, updateHighlight } from 'slices/book'
import { newSnackbar } from 'slices/snackbar'
// utils
import {  
	getParagraphCfi,
	clashCfiRange, 
	getSelectionPosition,
	compareCfi,
	cfiRangeSpliter,
	getNodefromCfi
} from 'lib/utils/commonUtil'
// styles
import viewerLayout, { contextmenuWidth } from 'lib/styles/viewerLayout'
// types
import { RootState } from 'slices'
import { BookStyle, BookFlow } from 'types/book'
import Page from 'types/page'
import Selection from 'types/selection'
import Highlight from 'types/highlight'


/**
 * Epub Reader의 Highlight 관련 hook
 * - [selection]: 현재 selection의 정보
 * - [onSelection]: selection 적용 함수 (Iframe에 selection 이벤트로 등록해야 합니다.)
 * - [onClickHighlight]: highlight 클릭 함수
 * - [onAddHighlight] highlight 생성 함수
 * - [onRemoveHighlight]: highlight 제거 함수
 * - [onUpdateHighlight]: highlight 갱신 함수
 *
 * @param viewerRef Viewer에 등록된 가지고 있는 useRef
 * @param setIsContextMenu Contextmenu를 컨트롤 할 수 있는 useState 함수
 * 
 * @example
 * const [isContextMenu, setIsContextMenu] = useState<boolean>(false);
 * 
 * const { 
 * 	selection, 
 * 	onSelection, 
 * 	onClickHighlight,
 * 	onRemoveHighlight
 * } = useSelection(viewerRef, setIsContextMenu);
 */
const useHighlight = (
	viewerRef: any, 
	setIsContextMenu: React.Dispatch<React.SetStateAction<boolean>>,
	bookStyle: BookStyle,
	bookFlow: BookFlow
) => {
	const dispatch = useDispatch();
	const currentLocation = useSelector<RootState, Page>(state => state.book.currentLocation);
	const highlights = useSelector<RootState, Highlight[]>(state => state.book.highlights);

	const [selection, setSelection] = useState<Selection>({
		update: false,
		x: 0,
		y: 0,
		height: 0,
		cfiRange: '',
		content: ''
	});
	

	/** 
	 * Selection 발동 이벤트
	 * @param cfiRange CfiRange
	 * @return Whether event is success
	 */
	const onSelection = useCallback((cfiRange: string): boolean => {
		if (!viewerRef.current) return false;

		const iframe = viewerRef.current.querySelector('iframe');
		if (!iframe) return false;

		const iframeWin = iframe.contentWindow;
		if (!iframeWin) return false;
		
		const filtered = highlights.filter(
			highlight => clashCfiRange(highlight.cfiRange, cfiRange)
		);

		if (filtered.length > 0) {
			dispatch(newSnackbar({
        text: "There are already registered highlights in your selection.", 
        type: "WARNING" 
      }));

			iframeWin.getSelection().removeAllRanges();
			return false;
		}

		const position = getSelectionPosition(
			viewerRef.current,
			bookStyle,
			bookFlow,
			viewerLayout.MIN_VIEWER_WIDTH,
			viewerLayout.MIN_VIEWER_HEIGHT,
			viewerLayout.VIEWER_HEADER_HEIGHT,
			contextmenuWidth
		);
		if (!position) return false;

		const { x, y, height } = position;

		const content = iframeWin.getSelection().toString().trim();

		if (content.length === 0) return false;
		
		setSelection({ 
			update: false,
			x, 
			y,
			height,
			cfiRange,
			content
		});
		
		return true;
	}, [
		dispatch, 
		viewerRef,
		highlights, 
		bookFlow, 
		bookStyle,
		setSelection
	]);

	/** Highlight 클릭 이벤트 */
	const onClickHighlight = useCallback((highlightNode: HTMLElement) => {
		const targetNode = highlightNode.parentElement;
		if (!targetNode) return;

		const cfiRange = targetNode.dataset.epubcfi;
		if (!cfiRange) return;

		const { x, y, width, height } = targetNode.getBoundingClientRect();

		setSelection({ 
			update: true,
			x: x + width / 2 - contextmenuWidth / 2, 
			y: y + height,
			height,
			cfiRange,
			content: ""
		});
	}, [setSelection]);

	/** 하이라이트 생성 함수 */
	const onAddHighlight = useCallback((color: string) => {
    const paragraphCfi = getParagraphCfi(selection.cfiRange);
    if (!paragraphCfi) return;
    
    const highlight: Highlight = {
      key: paragraphCfi + selection.cfiRange,
      accessTime: new Date().toISOString(),
      createTime: new Date().toISOString(),
      color,
      paragraphCfi,
      cfiRange: selection.cfiRange,
      chpaterName: currentLocation.chapterName,
      pageNum: currentLocation.currentPage,
      content: selection.content
    };

    dispatch(pushHighlight(highlight));

		setSelection({ ...selection, update: true });
  }, [dispatch, selection, currentLocation]);

	/** 
   * 하이라이트 수정
   * @param color 색상 Hex 코드
   */
	const onUpdateHighlight = useCallback((highlight: Highlight | null, color: string) => {
		if (!highlight) return;

    dispatch(updateHighlight({
      ...highlight,
      color
    }));
  }, [dispatch]);

	/** 
	 * 하이라이트 제거 함수 
	 * @param key 북마크 식별값
	 */
	 const onRemoveHighlight = useCallback((key: string, cfiRange: string) => {
		if (!viewerRef.current || !key) return;

		dispatch(popHighlight(key));

		dispatch(newSnackbar({
			text: "The highlight removed successful!", 
			type: "INFO" 
		}));
		
		viewerRef.current.offHighlight(cfiRange);
	}, [dispatch, viewerRef]);


	/**
	 * 하이라이트 여부 확인
	 * - 페이지 변경에 따른 하이라이트 확인 및 적용
	 */
	 useEffect(() => {
		if (!viewerRef.current) return;

		const iframe = viewerRef.current.querySelector('iframe');
		if (!iframe) return;

		const iframeWin = iframe.contentWindow;
		if (!iframeWin) return;

		highlights.forEach(highlight => {
			const cfiRange = cfiRangeSpliter(highlight.cfiRange);
			if (!cfiRange) return;

			const { startCfi } = cfiRange;

			if (compareCfi(currentLocation.startCfi, startCfi) < 1
				&& compareCfi(currentLocation.endCfi, startCfi) > -1) {
				const node = getNodefromCfi(highlight.paragraphCfi);
				if (!node) return;

				viewerRef.current.onHighlight(
					highlight.cfiRange,
					(e: any) => {
						onClickHighlight(e.target);
						setIsContextMenu(true);
					},
					highlight.color 
				);

				iframeWin.getSelection().removeAllRanges();
			}
		});
	}, [
		dispatch,
		viewerRef, 
		currentLocation, 
		highlights, 
		onRemoveHighlight,
		onClickHighlight,
		setIsContextMenu
	]);


	return { 
		selection, 
		onSelection, 
		onClickHighlight,
		onAddHighlight,
		onRemoveHighlight,
		onUpdateHighlight
	};
}

export default useHighlight;