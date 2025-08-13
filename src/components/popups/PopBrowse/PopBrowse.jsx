import { useState, useEffect } from "react";
import { tasksApi } from "../../../services/api";
import Calendar from "../../Calendar/Calendar";
import "./PopBrowse.css";

function PopBrowse({ isVisible, onClose, card, onTaskUpdated, onTaskDeleted }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Состояния для редактирования
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTopic, setEditTopic] = useState("");

  // Статусы для выбора
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  // Инициализация данных при открытии попапа
  useEffect(() => {
    if (isVisible && card) {
      setEditTitle(card.title || "");
      setEditDescription(card.description || "");
      setEditStatus(card.status || "");
      setEditTopic(card.topic || "");

      // Безопасная инициализация даты
      let safeDate = "";
      if (
        card.date &&
        typeof card.date === "string" &&
        card.date.trim() !== ""
      ) {
        try {
          // Простая проверка без вызова formatDate
          if (card.date.includes("-")) {
            const testDate = new Date(card.date);
            if (!isNaN(testDate.getTime())) {
              safeDate = testDate.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }
          } else if (card.date.includes(".")) {
            safeDate = card.date; // Уже в нужном формате
          }
        } catch (error) {
          console.warn("Ошибка при инициализации даты:", error);
          safeDate = "";
        }
      }
      setEditDate(safeDate);

      setIsEditMode(false);
      setError("");
    }
  }, [isVisible, card]);

  // Закрытие по Escape обработано в MainPage
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsEditMode(false);
    setError("");
    onClose();
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    setError("");

    // Если выходим из режима редактирования, сбрасываем изменения
    if (isEditMode) {
      setEditTitle(card.title || "");
      setEditDescription(card.description || "");
      setEditStatus(card.status || "");
      setEditDate(card.date || "");
      setEditTopic(card.topic || "");
    }
  };

  const handleSave = async () => {
    if (!card?._id) {
      setError("Ошибка: ID задачи не найден");
      return;
    }

    // Защита от повторных вызовов
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const updatedData = {
        title: editTitle || card.title,
        description: editDescription || "",
        status: editStatus || card.status,
        topic: editTopic || card.topic,
        date: editDate || "",
      };

      console.log("Отправляем данные для обновления:", updatedData);

      const updatedTasks = await tasksApi.updateTask(card._id, updatedData);
      console.log("Задача обновлена:", updatedTasks);

      if (onTaskUpdated) {
        onTaskUpdated(updatedTasks);
      }
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);
      setError(err.message || "Ошибка при сохранении изменений");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!card?._id) {
      setError("Ошибка: ID задачи не найден");
      return;
    }

    if (!window.confirm("Вы действительно хотите удалить эту задачу?")) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const updatedTasks = await tasksApi.deleteTask(card._id);
      console.log("Задача удалена:", updatedTasks);

      if (onTaskDeleted) {
        onTaskDeleted(updatedTasks);
      }
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
      setError(err.message || "Ошибка при удалении задачи");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status) => {
    setEditStatus(status);
  };

  const formatDate = (dateString) => {
    if (
      !dateString ||
      typeof dateString !== "string" ||
      dateString.trim() === ""
    )
      return "";

    try {
      // Если дата в формате ISO, конвертируем в DD.MM.YYYY
      if (dateString.includes("-")) {
        const date = new Date(dateString);
        // Проверяем что дата корректная
        if (isNaN(date.getTime())) {
          return "";
        }
        return date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }

      // Если дата уже в формате DD.MM.YYYY, возвращаем как есть
      if (dateString.includes(".")) {
        const [day, month, year] = dateString.split(".");
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        // Валидация компонентов даты
        if (
          !isNaN(dayNum) &&
          !isNaN(monthNum) &&
          !isNaN(yearNum) &&
          dayNum >= 1 &&
          dayNum <= 31 &&
          monthNum >= 1 &&
          monthNum <= 12 &&
          yearNum >= 1900 &&
          yearNum <= 2100
        ) {
          return `${dayNum.toString().padStart(2, "0")}.${monthNum
            .toString()
            .padStart(2, "0")}.${yearNum}`;
        }
      }

      return "";
    } catch (error) {
      console.warn("Ошибка при форматировании даты:", error);
      return "";
    }
  };

  const getTopicTheme = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "_gray";
    }
  };

  const handleDateSelect = (date) => {
    setEditDate(date);
  };

  if (!isVisible || !card) {
    return null;
  }

  return (
    <div className="pop-browse" style={{ display: "block" }}>
      <div className="pop-browse__container" onClick={handleOverlayClick}>
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">
                {isEditMode ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      fontSize: "20px",
                      fontWeight: "600",
                      background: "transparent",
                      width: "100%",
                    }}
                  />
                ) : (
                  editTitle
                )}
              </h3>
              <div
                className={`categories__theme theme-top ${getTopicTheme(
                  editTopic
                )} _active-category`}
              >
                <p className={getTopicTheme(editTopic)}>{editTopic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className={`status__theme ${
                      editStatus === status ? "_selected" : ""
                    } ${!isEditMode ? "_disabled" : ""}`}
                    onClick={
                      isEditMode ? () => handleStatusChange(status) : undefined
                    }
                    style={{
                      cursor: isEditMode ? "pointer" : "default",
                      backgroundColor:
                        editStatus === status && isEditMode ? "#94A6BE" : "",
                      color:
                        editStatus === status && isEditMode ? "#ffffff" : "",
                    }}
                  >
                    <p>{status}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly={!isEditMode}
                    placeholder="Введите описание задачи..."
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    style={{
                      backgroundColor: isEditMode ? "#ffffff" : "#eaeef6",
                      cursor: isEditMode ? "text" : "default",
                    }}
                  />
                </div>
              </form>
              <Calendar
                selectedDate={formatDate(editDate)}
                showPeriod={true}
                readOnly={!isEditMode}
                onDateSelect={isEditMode ? handleDateSelect : undefined}
              />
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div
                className={`categories__theme ${getTopicTheme(
                  editTopic
                )} _active-category`}
              >
                <p className={getTopicTheme(editTopic)}>{editTopic}</p>
              </div>
            </div>

            {error && <div className="pop-browse__error">{error}</div>}

            {/* Кнопки в режиме просмотра */}
            <div
              className={`pop-browse__btn-browse ${isEditMode ? "_hide" : ""}`}
            >
              <div className="btn-group">
                <button
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={handleEditModeToggle}
                  disabled={isLoading}
                >
                  Редактировать задачу
                </button>
                <button
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={handleClose}
                disabled={isLoading}
              >
                Закрыть
              </button>
            </div>

            {/* Кнопки в режиме редактирования */}
            <div
              className={`pop-browse__btn-edit ${!isEditMode ? "_hide" : ""}`}
            >
              <div className="btn-group">
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={handleEditModeToggle}
                  disabled={isLoading}
                >
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={handleClose}
                disabled={isLoading}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;
