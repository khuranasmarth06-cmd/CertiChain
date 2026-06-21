import { Link } from "react-router-dom";
import "../styles/Auth.css";
function InstituteLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Institute Login</h1>
        <form className="auth-form">
          <input
            type="email"
            placeholder="Institute Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button>
            Login
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/institute/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
export default InstituteLogin;