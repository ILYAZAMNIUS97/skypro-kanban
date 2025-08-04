import { useState, useEffect } from "react";
import "./Main.css";
import Column from "../Column/Column";
import { cardList } from "../../../data.js";

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
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {isLoading ? (
              <div className="loading">
                <p>Данные загружаются...</p>
              </div>
            ) : (
              columns.map((column, index) => (
                <Column key={index} title={column.title} cards={column.cards} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
