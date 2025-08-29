import { useEffect } from "react";
import Column from "../Column/Column";
import Loader from "../Loader/Loader";
import { useTasks } from "../../contexts/useTasks";
import { Container } from "../../App.styled";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

// Компонент пустого состояния
const EmptyState = () => (
  <LoadingContainer>
    <p>Новых задач нет</p>
  </LoadingContainer>
);

const Main = ({ onCardClick }) => {
  const { isLoading, error, loadTasks, getGroupedTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const columns = getGroupedTasks();

  // Проверяем, есть ли хотя бы одна задача во всех колонках
  const hasAnyTasks = columns.some((column) => column.cards.length > 0);

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <LoadingContainer>
                <p style={{ color: "red" }}>Ошибка: {error}</p>
              </LoadingContainer>
            ) : !hasAnyTasks ? (
              <EmptyState />
            ) : (
              columns.map((column, index) => (
                <Column
                  key={index}
                  title={column.title}
                  cards={column.cards}
                  onCardClick={onCardClick}
                />
              ))
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
