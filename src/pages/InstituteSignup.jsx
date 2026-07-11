import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAccount,useConnect,useDisconnect,} from "wagmi";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";
import { signupInstitute } from "../services/instituteAuth";
import { useEffect } from "react";
function InstituteSignup() {
  const navigate = useNavigate();
  useEffect(() => {
  const institute = localStorage.getItem("institute");

  if (institute) {
    navigate("/institute/dashboard");
  }
  }, [navigate]);
  const [instituteName, setInstituteName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    try {
      const response = await signupInstitute({
        instituteName,
        walletAddress: address,
        password,
      });
      alert(response.message);
      navigate("/institute/login");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h1>Institute Signup</h1>
          <form
            className="auth-form"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Institute Name"
              value={instituteName}
              onChange={(e) =>
                setInstituteName(e.target.value)
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            <button type="submit">
              Create Account
            </button>
          </form>
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/institute/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstituteSignup;