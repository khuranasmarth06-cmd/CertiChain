import { useState } from "react";
import { Link } from "react-router-dom";
import {useAccount,useConnect,useDisconnect,} from "wagmi";
import Navbar from "../components/Navbar";
import "../styles/Auth.css";
function StudentLogin() {
  const [password, setPassword] = useState("");
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!isConnected) {
      alert("Please connect MetaMask.");
      return;
    }
    console.log({
      walletAddress: address,
      password,
    });
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
                  onClick={disconnect}
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
            <button type="submit">
              Login
            </button>
          </form>
          <div className="auth-footer">
            Don't have an account?
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