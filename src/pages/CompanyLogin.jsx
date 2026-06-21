import "../styles/Auth.css";
function CompanyLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Company Login</h1>
        <form className="auth-form">
          <input
            type="email"
            placeholder="Company Email"
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
export default CompanyLogin;