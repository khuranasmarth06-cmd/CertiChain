import "../styles/Auth.css";
function StudentLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Student Login</h1>
        <form className="auth-form">
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default StudentLogin;