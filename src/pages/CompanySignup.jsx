import "../styles/Auth.css";
function CompanySignup() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Company Signup</h1>
        <form className="auth-form">
          <input
            placeholder="Company Name"
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
      </div>
    </div>
  );
}
export default CompanySignup;