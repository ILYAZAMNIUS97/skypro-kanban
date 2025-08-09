import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
