import { useState, useEffect } from "react";
import Column from "../Column/Column";
import { tasksApi } from "../../services/api";
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
  const [error, setError] = useState("");

  // Загрузка данных с API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const tasksData = await tasksApi.getTasks();
        setCards(tasksData);
      } catch (err) {
        console.error("Ошибка загрузки задач:", err);
        setError(err.message || "Ошибка при загрузке задач");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
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
            ) : error ? (
              <LoadingContainer>
                <p style={{ color: "red" }}>Ошибка: {error}</p>
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
