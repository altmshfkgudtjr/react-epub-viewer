import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// containers
import Highlight from 'containers/menu/commons/Highlight'
// components
import Wrapper from 'components/sideMenu/Wrapper'
import LearningLayout from 'components/learning/Layout'
import SortedBtnWrapper from 'components/learning/SortedBtnWrapper'
import SortedBtn from 'components/learning/SortedBtn'
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
  
  const [sorted, setSorted] = useState<Sorted>("CART");
  const [highlightList, setHighlightList] = useState<any[]>([]);
  
  /** 
   * Select sort type
   * @param type Viewed or Created
   */
  const onSortedClick = (type: Sorted) => setSorted(type);


  /** Set highlight contents */
  useEffect(() => {
    const sortedKey = sorted === "LOOK" 
      ? "accessTime" 
      : "createTime";

    const highlightList = highlights.slice().sort(function (a, b) {
      return new Date(b[sortedKey]).getTime() - new Date(a[sortedKey]).getTime();
    });
    const Items = highlightList.map(h => <Highlight key={h.key} 
                                                    highlight={h}
                                                    onClick={onClickHighlight} 
                                                    emitEvent={emitEvent}
                                                    viewerRef={viewerRef} />
    );
    setHighlightList(Items); 
  }, [
    viewerRef,
    sorted, 
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
        <SortedBtnWrapper>
          <SortedBtn 
            text="viewed" 
            isSelected={sorted === "LOOK"} 
            onClick={() => onSortedClick("LOOK")}
          />
          <SortedBtn 
            text="created" 
            isSelected={sorted === "CART"} 
            onClick={() => onSortedClick("CART")}
          />
        </SortedBtnWrapper>

        {highlightList.length > 0
          ? highlightList
          : <MenuEmpty text="Empty highlights!" />
        }
      </LearningLayout>
    </Wrapper>}
  </>);
}

type Sorted = "LOOK" | "CART"

interface Props {
  control: MenuControl;
  onToggle: () => void;
  onClickHighlight: (highlightNode: any) => void;
  emitEvent: () => void;
  viewerRef: any;
}

export default React.forwardRef(Note)