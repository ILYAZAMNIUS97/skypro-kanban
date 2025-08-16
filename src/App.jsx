import { BrowserRouter } from "react-router-dom";
import AppProviders from "./contexts/AppProviders";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { useAuth } from "./contexts/AuthContext";
import { GlobalStyle } from "./App.styled";

/**
 * Главный компонент приложения с роутингом
 */
const AppContent = () => {
  const { isAuth, isLoading } = useAuth();

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes isAuth={isAuth} />
      </BrowserRouter>
    </>
  );
};

/**
 * Корневой компонент приложения с провайдерами контекстов
 */
function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
