import "../styles/Auth.css";
function StudentSignup() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Student Signup</h1>
        <form className="auth-form">
          <input
            placeholder="Full Name"
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
export default StudentSignup;