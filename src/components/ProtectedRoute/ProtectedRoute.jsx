import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useAuth();

  // Показываем загрузку пока проверяется авторизация
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
