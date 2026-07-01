import React from 'react'
import { useState, useEffect } from 'react'
// components
import Wrapper from 'components/sideMenu/Wrapper'
import OptionLayout from 'components/option/Layout'
import OptionDropdown from 'components/option/Dropdown'
import OptionSlider from 'components/option/Slider'
import ControlIconBtnWrapper from 'components/option/ControlIconBtnWrapper'
import ControlIconBtn from 'components/option/ControlIconBtn'
import ThemeItem from 'components/option/ThemeItem'
// types
import { BookStyle, BookFontFamily, BookFlow } from 'types/book'
import { MenuControl } from 'lib/hooks/useMenu'
import { BookOption } from 'types/book'

const Option = ({ 
  control, 
  bookStyle,
  bookOption,
  bookFlow,
  onToggle, 
  emitEvent,
  onBookStyleChange,
  onBookOptionChange
}: Props, ref: any) => {
  const [fontFamily, setFontFamily] = useState<BookFontFamily>(bookStyle.fontFamily);
  const [fontSize, setFontSize] = useState<number>(bookStyle.fontSize);
  const [lineHeight, setLineHeight] = useState<number>(bookStyle.lineHeight);
  const [marginHorizontal, setMarginHorizontal] = useState<number>(bookStyle.marginHorizontal);
  const [marginVertical, setMarginVertical] = useState<number>(bookStyle.marginVertical);
  const [themeName, setThemeName] = useState<ThemeName>("Default");
  const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(true);
  const [viewType, setViewType] = useState<ViewType>({
    active: true,
    spread: true
  });


  /** Change font family */
  const onSelectFontFamily = (font: BookFontFamily) => setFontFamily(font);

  /** Select a preset theme (text + background color) */
  const onSelectTheme = (name: ThemeName) => setThemeName(name);

  /** Change font style and layout */
  const onChangeSlider = (type: SliderType, e: any) => {
    if (!e || !e.target) return;
    switch (type) {
      case "FontSize":
        setFontSize(e.target.value);
        break;
      case "LineHeight":
        setLineHeight(e.target.value);
        break;
      case "MarginHorizontal":
        setMarginHorizontal(e.target.value);
        break;
      case "MarginVertical":
        setMarginVertical(e.target.value);
        break;
      default:
        break;
    }
  }

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


  /* Save userdata */
  // TODO Fix the infinite re-rendering issue, when inlcude `onBookStyleChange` to dependencies array.
  /* eslint-disable */
  useEffect(() => {
    const theme = THEME_LIST.find(t => t.name === themeName);
    const timer = window.setTimeout(() => {
      onBookStyleChange({
        fontFamily,
        fontSize,
        lineHeight,
        marginHorizontal,
        marginVertical,
        color: theme && theme.color,
        backgroundColor: theme && theme.backgroundColor
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    fontFamily,
    fontSize,
    lineHeight,
    marginHorizontal,
    marginVertical,
    themeName
  ]);
  /* eslint-enable */

  /** Re-register close event, when after set */
  useEffect(() => emitEvent(), [bookStyle, emitEvent]);

  
  return (<>
    {control.display && <Wrapper title="Setting"
                                 show={control.open}
                                 onClose={onToggle}
                                 ref={ref}>
      <OptionLayout>
        <ControlIconBtnWrapper title="View Direction">
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
        </ControlIconBtnWrapper>
        <ControlIconBtnWrapper title="View Spread">
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
        </ControlIconBtnWrapper>
        <ControlIconBtnWrapper title="Theme">
          {THEME_LIST.map(theme => (
            <ThemeItem key={theme.name}
                       name={theme.name}
                       color={theme.color}
                       backgroundColor={theme.backgroundColor}
                       isSelected={themeName === theme.name}
                       onClick={() => onSelectTheme(theme.name)} />
          ))}
        </ControlIconBtnWrapper>
        <OptionDropdown title="Font"
                        defaultValue={fontFamily}
                        valueList={["Origin", "Roboto"]}
                        onSelect={onSelectFontFamily} />
        <OptionSlider active={true}
                      title="Size"
                      minValue={8}
                      maxValue={36}
                      defaultValue={fontSize}
                      step={1}
                      onChange={(e) => onChangeSlider("FontSize", e)} />
        <OptionSlider active={true}
                      title="Line height"
                      minValue={1}
                      maxValue={3}
                      defaultValue={lineHeight}
                      step={0.1}
                      onChange={(e) => onChangeSlider("LineHeight", e)} />
        <OptionSlider active={true}
                      title="Horizontal margin"
                      minValue={0}
                      maxValue={100}
                      defaultValue={marginHorizontal}
                      step={1}
                      onChange={(e) => onChangeSlider("MarginHorizontal", e)} />
        <OptionSlider active={bookFlow === "paginated"}
                      title="Vertical margin"
                      minValue={0}
                      maxValue={100}
                      defaultValue={marginVertical}
                      step={1}
                      onChange={(e) => onChangeSlider("MarginVertical", e)} />
      </OptionLayout>
    </Wrapper>}
  </>);
}

interface Props {
  control: MenuControl;
  bookStyle: BookStyle;
  bookOption: BookOption;
  bookFlow: BookFlow;
  onToggle: () => void;
  emitEvent: () => void;
  onBookStyleChange: (bookStyle: BookStyle) => void;
  onBookOptionChange: (bookOption: BookOption) => void;
}

type SliderType = "FontSize"
  | "LineHeight"
  | "MarginHorizontal"
  | "MarginVertical";

type ThemeName = "Default" | "Light" | "Sepia" | "Dark";

type Theme = {
  name: ThemeName;
  color?: string;
  backgroundColor?: string;
};

/**
 * Preset themes exercising the 0.3.1 `BookStyle.color` / `backgroundColor`.
 * "Default" leaves both undefined so the publisher's original colors are kept.
 */
const THEME_LIST: Theme[] = [
  { name: "Default" },
  { name: "Light", color: "#3c3c3c", backgroundColor: "#ffffff" },
  { name: "Sepia", color: "#5b4636", backgroundColor: "#f4ecd8" },
  { name: "Dark", color: "#cfcfcf", backgroundColor: "#1e1e1e" }
];

type ViewType = {
  active: boolean,
  spread: boolean
}

export default React.forwardRef(Option)