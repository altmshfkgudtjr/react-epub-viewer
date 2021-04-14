import styled from 'styled-components'

const BookInfo = ({src="", title ,publisher, author}: Props) => {
  return (
    <Container>
      <BookImg src={src} alt={title} />
      <BookContent>
        <Title>{title}</Title>
        <Info>{publisher}</Info>
        <Info>{author}</Info>
      </BookContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 24px;
`;

const BookImg = styled.img`
  margin-right: 12px;
  width: 44%;
  min-width: 120px;
  border-radius: 4px;
  background: #eee;
`;

const BookContent = styled.div`
  flex-grow: 1;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const Info = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

interface Props {
  src: string;
  title: string;
  publisher: string;
  author: string;
}

export default BookInfo