import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
// components
import OptionWrapper from 'components/option/OptionWrapper'
import OptionTitle from 'components/option/OptionTitle'
import DropdownValue from 'components/option/DropdownValue'
import DropdownItemWrapper from 'components/option/DropdownItemWrapper'
import DropdownItem from 'components/option/DropdownItem'
// types
import { BookFontFamily } from 'types/book'

const Dropdown = ({
  title,
  defaultValue,
  valueList,
  onSelect
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const value = defaultValue === "Origin" ? "Original" : defaultValue;
  
  /** Toggle dropdown */
  const onToggle = useCallback(() => setVisible(!visible), [visible]);

  /** Close dropdown */
  const onClose = useCallback((e: any) => {
    if (!ref || !ref.current) return;
    if (![...e.path].includes(ref.current)) {
      onToggle();
    }
  }, [ref, onToggle]);

  const Items = valueList.map(font => 
    <DropdownItem key={font} value={font} onClick={() => {
      onSelect(font);
      onToggle();
    }} />
  );

  /** Register dropdown close event */
  useEffect(() => {
    if (visible) {
      document.addEventListener('click', onClose);
    } else {
      document.removeEventListener('click', onClose);
    }
    return () => {
      document.removeEventListener('click', onClose);
    }
  }, [visible, onClose]);

  return (
    <OptionWrapper>
      <OptionTitle>{title}</OptionTitle>

      <DropdownWrapper ref={ref}>
        <DropdownValue value={value} 
                       isDropdown={visible} 
                       onClick={onToggle} />
        <DropdownItemWrapper show={visible}>
          {Items}
        </DropdownItemWrapper>
      </DropdownWrapper>
    </OptionWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: relative;
`;

interface Props {
  title: string;
  defaultValue: BookFontFamily;
  valueList: BookFontFamily[];
  onSelect: (font: BookFontFamily) => void;
}

export default Dropdown