import Card from "../Card/Card";
import { ColumnContainer, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards, onCardClick }) {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            topic={card.topic}
            title={card.title}
            date={card.date}
            cardData={card}
            onCardClick={onCardClick}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
}

export default Column;
