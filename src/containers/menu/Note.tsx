import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
// containers
import Highlight from 'containers/menu/commons/Highlight'
// components
import Wrapper from 'components/sideMenu/Wrapper'
import LearningLayout from 'components/note/Layout'
import MenuEmpty from 'components/sideMenu/MenuEmpty'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'
// types
import { RootState } from 'slices'
import HighlightType from 'types/highlight'
import { MenuControl } from 'lib/hooks/useMenu'


const Note = ({
  control,
  onToggle,
  onClickHighlight,
  onRemoveAllHighlights,
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
      {highlightList.length > 0 &&
        <ClearAllBtn onClick={onRemoveAllHighlights}>Clear all</ClearAllBtn>
      }
      <LearningLayout>
        {highlightList.length > 0
          ? highlightList
          : <MenuEmpty text="Empty highlights!" />
        }
      </LearningLayout>
    </Wrapper>}
  </>);
}

const ClearAllBtn = styled.button`
  align-self: flex-end;
  margin: 0 24px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${palette.red4};
  background-color: ${palette.red0};
  cursor: pointer;
  outline: none;
  transition: .15s ${styles.transition};

  &:hover, &:focus {
    color: ${palette.white};
    background-color: ${palette.red4};
  }
`;

interface Props {
  control: MenuControl;
  onToggle: () => void;
  onClickHighlight: (highlightNode: any) => void;
  onRemoveAllHighlights: () => void;
  emitEvent: () => void;
  viewerRef: any;
}

export default React.forwardRef(Note)