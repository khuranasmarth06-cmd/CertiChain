import { Navigate } from "react-router-dom";
function StudentProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const student = localStorage.getItem("student");
  if (!token || !student) {
    return (
      <Navigate
        to="/student/login"
        replace
      />
    );
  }
  return children;
}
export default StudentProtectedRoute;