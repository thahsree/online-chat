import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const isUser = localStorage.getItem("userCredentials");
  return isUser ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequireAuth;
