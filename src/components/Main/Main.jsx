import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Column from "../Column/Column";
import { tasksApi } from "../../services/api";
import { Container } from "../../App.styled";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

const Main = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  // Предоставляем методы для родительского компонента
  useImperativeHandle(ref, () => ({
    updateTasks: (newTasksList) => {
      setCards(newTasksList);
    },
    refreshTasks: loadTasks,
  }));

  // Загрузка данных с API
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

  useEffect(() => {
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
});

Main.displayName = "Main";

export default Main;
