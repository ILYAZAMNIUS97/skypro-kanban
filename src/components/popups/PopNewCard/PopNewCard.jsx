import { useState } from "react";
import "./PopNewCard.css";
import Calendar from "../../Calendar/Calendar";
import { tasksApi } from "../../../services/api";

function PopNewCard({ isVisible, onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design", // Категория по умолчанию
    date: "", // Выбранная дата
  });

  const [selectedCategory, setSelectedCategory] = useState("Web Design");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { name: "Web Design", className: "_orange" },
    { name: "Research", className: "_green" },
    { name: "Copywriting", className: "_purple" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении формы
    if (error) setError("");
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setFormData((prev) => ({
      ...prev,
      topic: categoryName,
    }));
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Название задачи обязательно для заполнения");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Подготавливаем данные для отправки на API
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        topic: selectedCategory,
        status: "Без статуса", // Статус по умолчанию для новых задач
        date: formData.date || null,
      };

      // Отправляем запрос на создание задачи
      const result = await tasksApi.createTask(taskData);

      console.log("Задача успешно создана:", result);

      // Вызываем callback для обновления списка задач если он передан
      if (onTaskCreated) {
        onTaskCreated(result);
      }

      // Закрываем модальное окно
      handleClose();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      setError(error.message || "Произошла ошибка при создании задачи");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Сбрасываем форму при закрытии
    setFormData({
      title: "",
      description: "",
      topic: "Web Design",
      date: "",
    });
    setSelectedCategory("Web Design");
    setError("");
    setIsLoading(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    // Закрываем модальное окно только если клик был по фону
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container" onClick={handleOverlayClick}>
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close" onClick={handleClose}>
              &#10006;
            </a>

            {error && (
              <div
                style={{
                  color: "#ff4757",
                  backgroundColor: "#ffe0e0",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleSubmit}
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  ></textarea>
                </div>
              </form>
              <Calendar
                selectedDate={formData.date}
                onDateSelect={handleDateSelect}
                showPeriod={!!formData.date}
              />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className={`categories__theme ${category.className} ${
                      selectedCategory === category.name
                        ? "_active-category"
                        : ""
                    }`}
                    onClick={() =>
                      !isLoading && handleCategorySelect(category.name)
                    }
                    style={{
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading
                        ? 0.6
                        : selectedCategory === category.name
                        ? 1
                        : 0.4,
                    }}
                  >
                    <p className={category.className}>{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleSubmit}
              disabled={!formData.title.trim() || isLoading}
              style={{
                opacity: !formData.title.trim() || isLoading ? 0.6 : 1,
                cursor:
                  !formData.title.trim() || isLoading
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopNewCard;
