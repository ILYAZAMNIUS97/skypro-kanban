import "./Main.css";
import Column from "../Column/Column";

function Main() {
  const columns = [
    {
      title: "Без статуса",
      cards: [
        {
          theme: "_orange",
          themeText: "Web Design",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Нужно сделать",
      cards: [
        {
          theme: "_green",
          themeText: "Research",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "В работе",
      cards: [
        {
          theme: "_purple",
          themeText: "Copywriting",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Тестирование",
      cards: [
        {
          theme: "_green",
          themeText: "Research",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Готово",
      cards: [
        {
          theme: "_green",
          themeText: "Research",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column, index) => (
              <Column key={index} title={column.title} cards={column.cards} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
