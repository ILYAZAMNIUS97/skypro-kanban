import axios from "axios";

// Базовая конфигурация API
const API_BASE_URL = "https://wedev-api.sky.pro";
const API_TOKEN = "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

// Создание экземпляра axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  // Убираем Content-Type заголовок, так как API его не принимает
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок авторизации
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API методы для авторизации
export const authApi = {
  /**
   * Авторизация пользователя
   * @param {Object} credentials - Данные для входа
   * @param {string} credentials.login - Email пользователя
   * @param {string} credentials.password - Пароль пользователя
   * @returns {Promise} Ответ от сервера
   */
  login: async (credentials) => {
    // ВРЕМЕННОЕ РЕШЕНИЕ: Mock авторизация пока нет документации для auth endpoints
    if (credentials.login === "admin" && credentials.password === "admin") {
      const mockUser = {
        id: 1,
        name: "Admin User",
        login: "admin",
        token: API_TOKEN,
      };
      localStorage.setItem("authToken", API_TOKEN);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { user: mockUser };
    } else {
      throw new Error("Неверные учетные данные");
    }

    // Когда будет документация для авторизации, раскомментируйте:
    // try {
    //   const response = await api.post("/auth/login", credentials);
    //   if (response.data.user && response.data.user.token) {
    //     localStorage.setItem("authToken", response.data.user.token);
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //   }
    //   return response.data;
    // } catch (error) {
    //   throw new Error(
    //     error.response?.data?.error || "Ошибка при входе в систему"
    //   );
    // }
  },

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - Данные для регистрации
   * @param {string} userData.name - Имя пользователя
   * @param {string} userData.login - Email пользователя
   * @param {string} userData.password - Пароль пользователя
   * @returns {Promise} Ответ от сервера
   */
  register: async (userData) => {
    // ВРЕМЕННОЕ РЕШЕНИЕ: Mock регистрация пока нет документации для auth endpoints
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      login: userData.login,
      token: API_TOKEN,
    };
    localStorage.setItem("authToken", API_TOKEN);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { user: mockUser };

    // Когда будет документация для регистрации, раскомментируйте:
    // try {
    //   const response = await api.post("/auth/register", userData);
    //   if (response.data.user && response.data.user.token) {
    //     localStorage.setItem("authToken", response.data.user.token);
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //   }
    //   return response.data;
    // } catch (error) {
    //   throw new Error(error.response?.data?.error || "Ошибка при регистрации");
    // }
  },

  /**
   * Выход из системы
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  /**
   * Получение данных текущего пользователя
   * @returns {Object|null} Данные пользователя или null
   */
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Проверка авторизации
   * @returns {boolean} Статус авторизации
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

// API методы для работы с задачами
export const tasksApi = {
  /**
   * Получение всех задач
   * @returns {Promise} Список задач
   */
  getTasks: async () => {
    try {
      const response = await api.get("/api/kanban");
      return response.data.tasks || [];
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке задач"
      );
    }
  },

  /**
   * Получение задачи по ID
   * @param {string|number} id - ID задачи
   * @returns {Promise} Данные задачи
   */
  getTask: async (id) => {
    try {
      const response = await api.get(`/api/kanban/${id}`);
      return response.data.task;
    } catch (error) {
      console.error("Ошибка при получении задачи:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при загрузке задачи"
      );
    }
  },

  /**
   * Создание новой задачи
   * @param {Object} taskData - Данные новой задачи
   * @returns {Promise} Созданная задача
   */
  createTask: async (taskData) => {
    try {
      // Конвертируем дату из формата "21.08.2025" в ISO формат если указана
      let isoDate = null;
      if (taskData.date) {
        const [day, month, year] = taskData.date.split(".");
        isoDate = new Date(year, month - 1, day).toISOString();
      }

      // Формируем данные согласно документации API
      const taskForAPI = {
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description || "",
        ...(isoDate && { date: isoDate }),
      };

      console.log("Отправляем данные на API:", taskForAPI);

      // Используем fetch с Content-Type: text/plain
      const token = localStorage.getItem("authToken") || API_TOKEN;

      const response = await fetch(`${API_BASE_URL}/api/kanban`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(taskForAPI),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ответ сервера (текст):", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Ответ от API:", data);

      return data.tasks; // Возвращает обновленный список
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);

      throw new Error(error.message || "Ошибка при создании задачи");
    }
  },

  /**
   * Обновление задачи
   * @param {string|number} id - ID задачи
   * @param {Object} taskData - Новые данные задачи
   * @returns {Promise} Обновленная задача
   */
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/api/kanban/${id}`, taskData);
      return response.data.tasks; // Возвращает обновленный список
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при обновлении задачи"
      );
    }
  },

  /**
   * Удаление задачи
   * @param {string|number} id - ID задачи
   * @returns {Promise} Результат операции
   */
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/api/kanban/${id}`);
      return response.data.tasks; // Возвращает обновленный список
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      throw new Error(
        error.response?.data?.error || "Ошибка при удалении задачи"
      );
    }
  },
};

// Экспорт основного экземпляра API
export default api;
