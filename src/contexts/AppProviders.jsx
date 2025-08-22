import { AuthProvider } from "./AuthContext";
import { TasksProvider } from "./TasksContext";

/**
 * Объединенный провайдер всех контекстов приложения
 */
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <TasksProvider>{children}</TasksProvider>
    </AuthProvider>
  );
};

export default AppProviders;
