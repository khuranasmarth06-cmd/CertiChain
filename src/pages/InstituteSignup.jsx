import { Link } from "react-router-dom";
import "../styles/Auth.css";
function InstituteSignup() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Institute Signup</h1>
        <form className="auth-form">
          <input
            placeholder="Institute Name"
          />
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button>
            Register
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/institute/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
export default InstituteSignup;