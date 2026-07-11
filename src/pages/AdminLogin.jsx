import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginAdmin } from "../services/adminAuth";
import "../styles/Auth.css";
function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({
        email,
        password,
      });
      localStorage.setItem(
        "token",
        response.token
      );
      localStorage.setItem(
        "admin",
        JSON.stringify(response.admin)
      );
      alert(response.message);
      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h1>Admin Login</h1>
          <form
            className="auth-form"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AdminLogin;