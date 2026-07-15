import { useNavigate, useLocation } from "react-router-dom";
import { useDisconnect } from "wagmi";
function LogoutButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { disconnect } = useDisconnect();
  const getLoginPath = () => {
    if (location.pathname.startsWith("/student")) return "/student/login";
    if (location.pathname.startsWith("/institute")) return "/institute/login";
    if (location.pathname.startsWith("/admin")) return "/admin/login";
    return "/";
  };
  const handleLogout = () => {
    const loginPath = getLoginPath();
    disconnect();
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    localStorage.removeItem("institute");
    localStorage.removeItem("admin");
    navigate(loginPath);
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