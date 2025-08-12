import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { authApi } from "./services/api";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { GlobalStyle } from "./App.styled";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = authApi.isAuthenticated();
      setIsAuth(isAuthenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    authApi.logout(); // Очищаем localStorage
    setIsAuth(false);
  };

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes
          isAuth={isAuth}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
