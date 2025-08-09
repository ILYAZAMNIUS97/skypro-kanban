import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import MainPage from "../../pages/MainPage/MainPage";
import CardPage from "../../pages/CardPage/CardPage";
import NewTaskPage from "../../pages/NewTaskPage/NewTaskPage";
import ExitPage from "../../pages/ExitPage/ExitPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function AppRoutes({ isAuth, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />

      {/* Защищенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <MainPage onLogout={onLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-task"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <NewTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ExitPage onLogout={onLogout} />
          </ProtectedRoute>
        }
      />

      {/* 404 страница */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
