import { useState, useEffect } from "react";
import Column from "../Column/Column";
import { cardList } from "../../../data.js";
import { Container } from "../../App.styled";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  // Имитация загрузки данных
  useEffect(() => {
    setTimeout(() => {
      setCards(cardList);
      setIsLoading(false);
    }, 2000); // 2 секунды задержки
  }, []);

  // Группировка карточек по статусам
  const groupCardsByStatus = (cards) => {
    const statuses = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    return statuses.map((status) => ({
      title: status,
      cards: cards.filter((card) => card.status === status),
    }));
  };

  const columns = groupCardsByStatus(cards);

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {isLoading ? (
              <LoadingContainer>
                <p>Данные загружаются...</p>
              </LoadingContainer>
            ) : (
              columns.map((column, index) => (
                <Column key={index} title={column.title} cards={column.cards} />
              ))
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
}

export default Main;
