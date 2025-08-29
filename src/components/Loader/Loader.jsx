import {
  LoaderContainer,
  LoaderContent,
  LoaderColumn,
  LoaderColumnTitle,
  LoaderCard,
  LoaderCardLine,
  LoaderCardShortLine,
} from "./Loader.styled";

const Loader = () => {
  const columns = [
    "БЕЗ СТАТУСА",
    "НУЖНО СДЕЛАТЬ",
    "В РАБОТЕ",
    "ТЕСТИРОВАНИЕ",
    "ГОТОВО",
  ];

  const getCardsCount = (index) => {
    // Разное количество карточек в колонках для реалистичности
    const cardCounts = [4, 3, 2, 0, 0];
    return cardCounts[index] || 0;
  };

  return (
    <LoaderContainer>
      <LoaderContent>
        {columns.map((columnTitle, columnIndex) => (
          <LoaderColumn key={columnIndex}>
            <LoaderColumnTitle>{columnTitle}</LoaderColumnTitle>
            {Array.from({ length: getCardsCount(columnIndex) }).map(
              (_, cardIndex) => (
                <LoaderCard key={cardIndex}>
                  <LoaderCardLine />
                  <LoaderCardLine />
                  <LoaderCardShortLine />
                </LoaderCard>
              )
            )}
          </LoaderColumn>
        ))}
      </LoaderContent>
    </LoaderContainer>
  );
};

export default Loader;
