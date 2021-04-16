import { useState } from 'react'
// components
import Wrapper from 'components/header/Wrapper'
import Layout, { AutoLayout } from 'components/header/Layout'
import Logo from 'components/header/Logo'
import ControlBtn from 'components/header/ControlBtn'
import ControlIconBtn from 'components/header/ControlIconBtn'
import VerticalLine from 'components/header/VerticalLine'
// types
import { BookOption } from 'types/book'


const Header = ({ 
  title, 
  bookOption, 
  onNavToggle, 
  onOptionToggle, 
  onLearningToggle,
  onBookOptionChange
}: Props) => {
  const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(true);
  const [viewType, setViewType] = useState<ViewType>({
    active: true,
    spread: true
  });


  /** 
   * Select view direction
   * @param type Direction
   */
  const onClickDirection = (type: "Horizontal" | "Vertical") => {
    if (type === "Horizontal") {
      setIsScrollHorizontal(true);
      setViewType({ ...viewType, active: true });
      onBookOptionChange({
        ...bookOption,
        flow: "paginated"
      });
    } else {
      setIsScrollHorizontal(false);
      setViewType({ ...viewType, active: false });
      onBookOptionChange({
        ...bookOption,
        flow: "scrolled-doc"
      });
    }
  }

  /**
   * Select isSpread
   * @param isSpread Whether spread view 
   */
  const onClickViewType = (isSpread: boolean) => {
    if (isSpread) {
      setViewType({ ...viewType, spread: true });
      onBookOptionChange({
        ...bookOption,
        spread: "auto"
      });
    } else {
      setViewType({ ...viewType, spread: false });
      onBookOptionChange({
        ...bookOption,
        spread: "none"
      });
    }
  }


  return (
    <Wrapper>
      <Layout>
        <AutoLayout>
          <div>
            <Logo />
            <ControlBtn message="Contents" onClick={onNavToggle} />
            <ControlBtn message="Setting" onClick={onOptionToggle} />
            <ControlBtn message="Highlights" onClick={onLearningToggle} />
          </div>

          <div>
            <ControlIconBtn type="ScrollHorizontal"
                            alt="Horizontal View"
                            active={true}
                            isSelected={isScrollHorizontal}
                            onClick={() => onClickDirection("Horizontal")} />
            <ControlIconBtn type="ScrollVertical" 
                            alt="Vertical View"
                            active={true}
                            isSelected={!isScrollHorizontal}
                            onClick={() => onClickDirection("Vertical")} />

            <VerticalLine />

            <ControlIconBtn type="BookOpen" 
                            alt="Two Page View"
                            active={viewType.active}
                            isSelected={viewType.spread}
                            onClick={() => onClickViewType(true)} />
            <ControlIconBtn type="BookClose" 
                            alt="One Page View"
                            active={viewType.active}
                            isSelected={!viewType.spread}
                            onClick={() => onClickViewType(false)} />
          </div>
        </AutoLayout>
      </Layout>
    </Wrapper>
  );
}

interface Props {
  title: string;
  bookOption: BookOption;
  onNavToggle: (value?: boolean) => void;
  onOptionToggle: (value?: boolean) => void;
  onLearningToggle: (value?: boolean) => void;
  onBookOptionChange: (bookOption: BookOption) => void;
}

type ViewType = {
  active: boolean,
  spread: boolean
}

export default Header