import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";
function LogoutButton() {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const handleLogout = () => {
    disconnect();
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