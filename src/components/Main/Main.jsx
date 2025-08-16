import { useEffect } from "react";
import Column from "../Column/Column";
import { useTasks } from "../../contexts/TasksContext";
import { Container } from "../../App.styled";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

const Main = ({ onCardClick }) => {
  const { isLoading, error, loadTasks, getGroupedTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const columns = getGroupedTasks();

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
