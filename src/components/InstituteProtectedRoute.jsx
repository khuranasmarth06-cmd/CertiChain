import { Navigate } from "react-router-dom";
function InstituteProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const institute =localStorage.getItem("institute");
  if (!token || !institute) {
    return (
      <Navigate
        to="/institute/login"
        replace
      />
    );
  }
  return children;
}
export default InstituteProtectedRoute;