import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import "../styles/Dashboard.css";
import usePendingInstitutes from "../hooks/usePendingInstitutes";
function AdminDashboard() {
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );
  const { institutes, loading } = usePendingInstitutes();
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
          <div className="table-section">
            <h2>
              Pending Institute Requests
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : institutes.length === 0 ? (
              <p>
                No pending requests.
              </p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Institute</th>
                    <th>Wallet</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {institutes.map(
                    (institute) => (
                      <tr key={institute._id}>
                        <td>
                          {institute.instituteName}
                        </td>
                        <td>
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td>
                          {institute.status}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;