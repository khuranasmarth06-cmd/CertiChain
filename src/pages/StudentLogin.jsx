import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginStudent } from "../services/studentAuth";
import Spinner from "../components/Spinner";
import "../styles/Auth.css";
function StudentLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const student = localStorage.getItem("student");
    if (student) {
      navigate("/student/dashboard");
    }
  }, [navigate]);
  const [walletAddress, setWalletAddress] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await loginStudent({
        walletAddress,
        password,
      });
      console.log(response);
      localStorage.setItem(
        "token",
        response.token
      );
      localStorage.setItem(
        "student",
        JSON.stringify(response.student)
      );
      alert(
        response.message || "Login Successful"
      );
      navigate("/student/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h1>Student Login</h1>
          <form
            className="auth-form"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) =>
                setWalletAddress(e.target.value)
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
            <button
              type="submit"
              disabled={submitting}
              className="btn-with-spinner"
            >
              {submitting && <Spinner />}
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/student/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default StudentLogin;