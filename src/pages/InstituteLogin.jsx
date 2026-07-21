import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAccount,useConnect,useDisconnect,} from "wagmi";
import Navbar from "../components/Navbar";
import { loginInstitute } from "../services/instituteAuth";
import Spinner from "../components/Spinner";
import "../styles/Auth.css";
import { useEffect } from "react";
function InstituteLogin() {
  const navigate = useNavigate();
  useEffect(() => {
  const institute = localStorage.getItem("institute");
  if (institute) {
    navigate("/institute/dashboard");
  }
 }, [navigate]);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const metaMaskConnector = connectors.find(
    (connector) =>
      connector.name.toLowerCase().includes("metamask")
  );
  const handleConnectWallet = () => {
    if (!metaMaskConnector) {
      alert("MetaMask connector not found.");
      return;
    }
    connect({
      connector: metaMaskConnector,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      alert("Please connect MetaMask.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await loginInstitute({
        walletAddress: address,
        password,
      });
      localStorage.setItem(
        "token",
        response.token
      );
      localStorage.setItem(
        "institute",
        JSON.stringify(
          response.institute
        )
      );
      alert(response.message);
      navigate("/institute/dashboard");
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
          <h1>Institute Login</h1>
          <form
            className="auth-form"
            onSubmit={handleLogin}
          >
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
                  onClick={handleConnectWallet}
                >
                  Connect MetaMask
                </button>
              ) : (
                <button
                  type="button"
                  className="wallet-btn connected"
                  onClick={disconnect}
                >
                  Connected ✓
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
            <Link to="/institute/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstituteLogin;