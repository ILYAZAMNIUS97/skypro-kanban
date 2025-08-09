import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cardList } from "../../../data.js";
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

  useEffect(() => {
    const foundCard = cardList.find((c) => c.id === parseInt(id));
    if (foundCard) {
      setCard(foundCard);
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  if (!card) {
    return <div>Загрузка...</div>;
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
