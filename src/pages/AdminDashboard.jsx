import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import usePendingInstitutes from "../hooks/usePendingInstitutes";
import useApprovedInstitutes from "../hooks/useApprovedInstitutes";
import { approveInstitute, rejectInstitute } from "../services/adminAuth";
import { addInstitute } from "../services/contractService";
import "../styles/Dashboard.css";
function AdminDashboard() {
  const { institutes, loading } = usePendingInstitutes();
  const {institutes: approvedInstitutes,loading: approvedLoading,} = useApprovedInstitutes();
  const handleApprove = async (walletAddress) => {
    try {
      const txHash = await addInstitute(walletAddress);
      await approveInstitute(walletAddress);
      alert(
        `Institute Approved Successfully!\n\nTransaction Hash:\n${txHash}`
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error.shortMessage ||
          error.response?.data?.message ||
          error.message ||
          "Approval Failed"
      );
    }
  };
  const handleReject = async (walletAddress) => {
    try {
      await rejectInstitute(walletAddress);
      alert("Institute Rejected Successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Reject Failed"
      );
    }
  };
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
          <p>Manage institutes and platform.</p>
        </div>
        <div className="table-section">
          <h2>Pending Institute Requests</h2>
          {loading ? (
            <p>Loading...</p>
          ) : institutes.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Institute</th>
                  <th>Wallet</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((institute) => (
                  <tr key={institute._id}>
                    <td>{institute.instituteName}</td>
                    <td>
                      {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                    </td>
                    <td>{institute.status}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() =>
                            handleApprove(
                              institute.walletAddress
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleReject(
                              institute.walletAddress
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="table-section">
          <h2>Approved Institutes</h2>
          {approvedLoading ? (
            <p>Loading...</p>
          ) : approvedInstitutes.length === 0 ? (
            <p>No approved institutes.</p>
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
                {approvedInstitutes.map((institute) => (
                  <tr key={institute._id}>
                    <td>{institute.instituteName}</td>
                    <td>
                      {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                    </td>
                    <td>Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;