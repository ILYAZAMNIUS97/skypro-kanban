import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import PopUser from "../../components/popups/PopUser/PopUser";
import { Wrapper } from "../../App.styled";
import {
  NewTaskContainer,
  NewTaskHeader,
  NewTaskBackButton,
  NewTaskContent,
  NewTaskTitle,
  NewTaskForm,
  NewTaskGroup,
  NewTaskLabel,
  NewTaskInput,
  NewTaskSelect,
  NewTaskTextarea,
  NewTaskButton,
} from "./NewTaskPage.styled";

function NewTaskPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    topic: "Web Design",
    status: "Без статуса",
    description: "",
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика сохранения задачи
    console.log("Новая задача:", formData);
    navigate("/");
  };

  return (
    <Wrapper>
      <PopUser />
      <Header />
      <NewTaskContainer>
        <NewTaskHeader>
          <NewTaskBackButton onClick={handleBack}>
            ← Вернуться к доске
          </NewTaskBackButton>
        </NewTaskHeader>
        <NewTaskContent>
          <NewTaskTitle>Создать новую задачу</NewTaskTitle>
          <NewTaskForm onSubmit={handleSubmit}>
            <NewTaskGroup>
              <NewTaskLabel>Название задачи</NewTaskLabel>
              <NewTaskInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите название задачи"
                required
              />
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Тема</NewTaskLabel>
              <NewTaskSelect
                name="topic"
                value={formData.topic}
                onChange={handleChange}
              >
                <option value="Web Design">Web Design</option>
                <option value="Research">Research</option>
                <option value="Copywriting">Copywriting</option>
              </NewTaskSelect>
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Статус</NewTaskLabel>
              <NewTaskSelect
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Без статуса">Без статуса</option>
                <option value="Нужно сделать">Нужно сделать</option>
                <option value="В работе">В работе</option>
                <option value="Тестирование">Тестирование</option>
                <option value="Готово">Готово</option>
              </NewTaskSelect>
            </NewTaskGroup>
            <NewTaskGroup>
              <NewTaskLabel>Описание</NewTaskLabel>
              <NewTaskTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Введите описание задачи"
                rows="5"
              />
            </NewTaskGroup>
            <NewTaskButton type="submit">Создать задачу</NewTaskButton>
          </NewTaskForm>
        </NewTaskContent>
      </NewTaskContainer>
    </Wrapper>
  );
}

export default NewTaskPage;
