// components
import Wrapper from 'components/footer/Wrapper'
import Item from 'components/footer/Item'
import MoveBtn from 'components/footer/MoveBtn'


const Footer = ({ title, nowPage, totalPage, onPageMove }: Props) => {
  return (
    <Wrapper>
      <MoveBtn type="PREV" onClick={() => onPageMove("PREV")} />
      <Item text={title} />
      <Item text={`${nowPage} / ${totalPage}`} />
      <MoveBtn type="NEXT" onClick={() => onPageMove("NEXT")} />
    </Wrapper>
  );
}

interface Props {
  title: string;
  nowPage: number;
  totalPage: number;
  onPageMove: (type: "PREV" | "NEXT") => void;
}

export default Footer