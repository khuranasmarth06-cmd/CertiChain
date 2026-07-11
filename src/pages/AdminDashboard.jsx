import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import "../styles/Dashboard.css";
function AdminDashboard() {
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2 className="welcome-text">
            👋 Welcome, Admin
          </h2>
          <div className="dashboard-top">
            <h1>Admin Dashboard</h1>
            <LogoutButton />
          </div>
          <p>
            Manage institutes and platform.
          </p>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;