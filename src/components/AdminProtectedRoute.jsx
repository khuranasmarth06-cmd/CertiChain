import { Navigate } from "react-router-dom";
function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  if (!token || !admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }
  return children;
}
export default AdminProtectedRoute;