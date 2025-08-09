import Card from "../Card/Card";
import { ColumnContainer, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards }) {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            topic={card.topic}
            title={card.title}
            date={card.date}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
}

export default Column;
