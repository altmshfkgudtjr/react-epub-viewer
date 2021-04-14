import { useState, useEffect, useCallback } from 'react';

/**
 * Epub Reader 메뉴를 컨트롤 하는 hook
 * - control의 display를 Menu 생성/제거 플래그로 이용합니다.
 * - control의 show를 Animaton 플래그로 이용합니다.
 * - Menu 이외의 영역 클릭시 Close Event 발동
 *
 * @param ref DOM을 가지고 있는 useRef
 * @param delay 애니메이션 딜레이 시간(ms)
 * 
 * @example
 * const Viewer = () => {
 *   const menuDelay = 300;
 * 
 *   const ref = useRef<HTMLDivElement | null>(null);
 *   const [control, onToggle] = usemenu(ref, menuDelay);
 * 
 *   return (<>
 *     <MenuOpenBtn onClick={onToggle} />
 *     <Menu control={control} onToggle={onToggle} ref={ref} />
 *   </>);
 * }
 * 
 * const Menu = ({ control, onToggle }, ref) => {
 *   return (<>
 *     {control.display && <MenuWrapper show={control.show} 
 *                                      delay={menuDelay}
 *                                      ref={ref}>
 *       <CloseBtn onClick={onToggle} />
 *     </MenuWrapper>}
 *   </>);
 * }
 * 
 * const MenuWrapper = styled.div<{show: boolean; delay: boolean;}>`
 *   transform: ${({show}) => show
 *     ? "translateX(0px)"
 *     : "translateX(420px)"
 *   };
 *   transition: ${({delay}) => `${delay}ms ease`};
 * `;
 */
function useMenu(ref: { current: any }, delay: number) {
	const [eventSignal, setEventSignal] = useState<boolean>(true);
	const [control, setControl] = useState<MenuControl>({
		display: false,
		open: false
	});
	

	/** Menu 토글 */
	const onToggle = useCallback(() => {
		let event: any = null;
		window.clearTimeout(event);
		if (!control.display) {
			setControl({ display: true, open: false });
			event = window.setTimeout(() => setControl({ display: true, open: true}), 0);
		} else {
			setControl({ display: true, open: false });
			event = window.setTimeout(() => setControl({ display: false, open: false }), delay - 50);
		}
	}, [control.display, delay]);

	/** 
	 * 메뉴 닫기 
	 * - Event path에서 메뉴가 포함되어있지 않으면, 함수를 실행합니다.
	 */
  const onClose = useCallback((e: any) => {
    if (!ref || !ref.current) return;
    if (!e.path.includes(ref.current)) {
			onToggle();
    }
  }, [ref, onToggle]);

	/** 
	 * 이벤트 재등록
	 * - '보기설정' 에서 rendition이 재 렌더링 될 때, 이벤트를 재등록하기 위한 함수
	 * - Iframe 생성 시간 대기 [About 250ms]
	 */
	const emitEvent = useCallback(() => {
		window.setTimeout(() => setEventSignal(true), 300);
	}, [setEventSignal]); 


  /** 
	 * 목차 닫기 이벤트 등록 
	 * - Epub이 iframe으로 등록되므로, iframe에도 Event를 등록시켜줍니다.
	 */
  useEffect(() => {
		if (!eventSignal && !control.display) return;
		
    const epubIframe = document.querySelector('iframe');

		if (control.display) {
			document.addEventListener('click', onClose);
			if (epubIframe && epubIframe.contentWindow) {
				epubIframe.contentWindow.document.addEventListener('click', onClose);
			}
		} else {
			document.removeEventListener('click', onClose);
      if (epubIframe && epubIframe.contentWindow) {
				epubIframe.contentWindow.document.removeEventListener('click', onClose);
      }
		}

		setEventSignal(false);
  
    return () => {
      document.removeEventListener('click', onClose);
      if (epubIframe && epubIframe.contentWindow) {
				epubIframe.contentWindow.document.removeEventListener('click', onClose);
      }
    }
  }, [control.display, onClose, eventSignal]);

	return [control, onToggle, emitEvent] as const;
}

export type MenuControl = {
	display: boolean;
	open: boolean;
}

export default useMenu