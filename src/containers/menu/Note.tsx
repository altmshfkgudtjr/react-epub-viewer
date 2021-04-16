import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// containers
import Highlight from 'containers/menu/commons/Highlight'
// components
import Wrapper from 'components/sideMenu/Wrapper'
import LearningLayout from 'components/note/Layout'
import MenuEmpty from 'components/sideMenu/MenuEmpty'
// types
import { RootState } from 'slices'
import HighlightType from 'types/highlight'
import { MenuControl } from 'lib/hooks/useMenu'


const Note = ({ 
  control, 
  onToggle, 
  onClickHighlight, 
  emitEvent,
  viewerRef 
}: Props, ref: any) => {
  const highlights = useSelector<RootState, HighlightType[]>(state => state.book.highlights);
  const [highlightList, setHighlightList] = useState<any[]>([]);


  /** Set highlight contents */
  useEffect(() => {
    const Items = highlights.map(h => <Highlight key={h.key} 
                                                 highlight={h}
                                                 onClick={onClickHighlight} 
                                                 emitEvent={emitEvent}
                                                 viewerRef={viewerRef} />
    );
    setHighlightList(Items); 
  }, [
    viewerRef,
    highlights,
    onClickHighlight,
    emitEvent,
    setHighlightList
  ]);


  return (<>
    {control.display && <Wrapper title="Highlight"
                                 show={control.open}
                                 onClose={onToggle}
                                 ref={ref} >
      <LearningLayout>
        {highlightList.length > 0
          ? highlightList
          : <MenuEmpty text="Empty highlights!" />
        }
      </LearningLayout>
    </Wrapper>}
  </>);
}

interface Props {
  control: MenuControl;
  onToggle: () => void;
  onClickHighlight: (highlightNode: any) => void;
  emitEvent: () => void;
  viewerRef: any;
}

export default React.forwardRef(Note)