import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tasksApi } from "../../services/api";
import Header from "../../components/Header/Header";
import PopUser from "../../components/popups/PopUser/PopUser";
import { Wrapper } from "../../App.styled";
import {
  CardPageContainer,
  CardHeader,
  CardBackButton,
  CardContent,
  CardTitle,
  CardInfo,
  CardDescription,
} from "./CardPage.styled";

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCard = async () => {
      try {
        setIsLoading(true);
        setError("");
        const cardData = await tasksApi.getTask(id);
        setCard(cardData);
      } catch (err) {
        console.error("Ошибка загрузки карточки:", err);
        setError(err.message || "Карточка не найдена");
        // Перенаправляем на 404 если карточка не найдена
        if (err.response?.status === 404) {
          navigate("/not-found");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCard();
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!card) {
    return <div>Карточка не найдена</div>;
  }

  return (
    <Wrapper>
      <PopUser />
      <Header />
      <CardPageContainer>
        <CardHeader>
          <CardBackButton onClick={handleBack}>
            ← Вернуться к доске
          </CardBackButton>
        </CardHeader>
        <CardContent>
          <CardTitle>Карточка #{card.id}</CardTitle>
          <CardInfo>
            <h3>{card.title}</h3>
            <p>
              <strong>Статус:</strong> {card.status}
            </p>
            <p>
              <strong>Тема:</strong> {card.topic}
            </p>
            <p>
              <strong>Дата:</strong> {card.date}
            </p>
          </CardInfo>
          <CardDescription>
            <h4>Описание:</h4>
            <p>Здесь будет описание задачи для карточки #{card.id}</p>
          </CardDescription>
        </CardContent>
      </CardPageContainer>
    </Wrapper>
  );
}

export default CardPage;
