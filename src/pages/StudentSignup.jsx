import { useState } from "react";
import { Link } from "react-router-dom";
import {useAccount,useConnect,useDisconnect,} from "wagmi";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";
import { signupStudent } from "../services/studentAuth";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function StudentSignup() {
  const [name, setName] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
  const student = localStorage.getItem("student");
  if (student) {
    navigate("/student/dashboard");
  }
  }, [navigate]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
   const handleSignup = async (e) => {
  e.preventDefault();
  if (!isConnected) {
    alert("Please connect MetaMask.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  setSubmitting(true);
  try {
    const response = await signupStudent({
      name,
      walletAddress: address,
      password,
    });
    alert(response.message);
    navigate("/student/login");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Signup Failed"
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
          <h1>Student Signup</h1>
          <form
            className="auth-form"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
            <div className="wallet-box">
              <input
                type="text"
                placeholder="Wallet Address"
                value={address || ""}
                readOnly
              />
              {!isConnected ? (
                <button
                  type="button"
                  className="wallet-btn"
                  onClick={() =>
                    connect({
                      connector: connectors[0],
                    })
                  }
                >
                  Connect
                </button>
              ) : (
                <button
                  type="button"
                  className="wallet-btn connected"
                  onClick={() => disconnect()}
                >
                  Connected
                </button>
              )}
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-with-spinner"
            >
              {submitting && <Spinner />}
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/student/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default StudentSignup;