import { BrowserRouter } from "react-router-dom";
import AppProviders from "./contexts/AppProviders";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { GlobalStyle } from "./App.styled";

/**
 * Главный компонент приложения с роутингом
 */
const AppContent = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppRoutes />
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
