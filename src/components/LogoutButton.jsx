import { useNavigate } from "react-router-dom";
function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    localStorage.removeItem("institute");
    localStorage.removeItem("admin");
    navigate("/");
  };
  return (
    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
export default LogoutButton;