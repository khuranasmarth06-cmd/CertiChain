import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import StatCard from "../components/StatCard";
import usePendingInstitutes from "../hooks/usePendingInstitutes";
import useApprovedInstitutes from "../hooks/useApprovedInstitutes";
import useRejectedInstitutes from "../hooks/useRejectedInstitutes";
import useCertificateCount from "../hooks/useCertificateCount";
import { approveInstitute, rejectInstitute } from "../services/adminAuth";
import { addInstitute, removeInstitute } from "../services/contractService";
import useEnsureWallet from "../hooks/useEnsureWallet";
import { FaCertificate, FaHourglassHalf, FaUniversity, FaBan } from "react-icons/fa";
import "../styles/Dashboard.css";
function AdminDashboard() {
  const { institutes, loading } = usePendingInstitutes();
  const {institutes: approvedInstitutes,loading: approvedLoading,} = useApprovedInstitutes();
  const {institutes: rejectedInstitutes,loading: rejectedLoading,} = useRejectedInstitutes();
  const { count: certificateCount, loading: certificateLoading } = useCertificateCount();
  const ensureWalletConnected = useEnsureWallet();

  // Approves an institute on-chain + in the DB. Works for both a
  // pending request and a previously rejected institute, since both
  // just need to be (re)added to the contract and flipped to "Approved".
  const handleApprove = async (walletAddress) => {
    try {
      await ensureWalletConnected();
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

  // Rejects a pending request. No on-chain action needed yet since the
  // institute was never added to the contract.
  const handleReject = async (walletAddress) => {
    try {
      await ensureWalletConnected();
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

  // Reverses an approval: removes the institute from the contract, then
  // flips its DB status back to "Rejected" so it shows up in the
  // Rejected table (and can be re-approved later).
  const handleRejectApproved = async (walletAddress) => {
    try {
      await ensureWalletConnected();
      const txHash = await removeInstitute(walletAddress);
      await rejectInstitute(walletAddress);
      alert(
        `Institute Access Revoked!\n\nTransaction Hash:\n${txHash}`
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error.shortMessage ||
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
            Welcome back, Admin
          </h2>
          <div className="dashboard-top">
            <h1>Admin Dashboard</h1>
            <LogoutButton />
          </div>
          <p>Manage institutes and platform.</p>
        </div>
        <div className="stats-grid">
          <StatCard
            icon={<FaCertificate />}
            label="Certificates Issued"
            value={certificateCount}
            loading={certificateLoading}
            variant="primary"
          />
          <StatCard
            icon={<FaHourglassHalf />}
            label="Pending Requests"
            value={institutes.length}
            loading={loading}
            variant="warning"
          />
          <StatCard
            icon={<FaUniversity />}
            label="Institutes Approved"
            value={approvedInstitutes.length}
            loading={approvedLoading}
            variant="success"
          />
        </div>
        <div className="tables-row">
          <div className="table-section">
            <h2>Pending Institute Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : institutes.length === 0 ? (
              <p>No pending requests.</p>
            ) : (
              <div className="table-scroll">
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
                        <td data-label="Institute">{institute.instituteName}</td>
                        <td data-label="Wallet">
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td data-label="Status">{institute.status}</td>
                        <td data-label="Action">
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
              </div>
            )}
          </div>
          <div className="table-section">
            <h2>Approved Institutes</h2>
            {approvedLoading ? (
              <p>Loading...</p>
            ) : approvedInstitutes.length === 0 ? (
              <p>No approved institutes.</p>
            ) : (
              <div className="table-scroll">
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
                    {approvedInstitutes.map((institute) => (
                      <tr key={institute._id}>
                        <td data-label="Institute">{institute.instituteName}</td>
                        <td data-label="Wallet">
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td data-label="Status">Approved</td>
                        <td data-label="Action">
                          <div className="action-buttons">
                            <button
                              className="reject-btn"
                              onClick={() =>
                                handleRejectApproved(
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
              </div>
            )}
          </div>
        </div>
        <div className="tables-row" style={{ marginTop: "24px" }}>
          <div className="table-section">
            <h2>Rejected Institutes</h2>
            {rejectedLoading ? (
              <p>Loading...</p>
            ) : rejectedInstitutes.length === 0 ? (
              <p>No rejected institutes.</p>
            ) : (
              <div className="table-scroll">
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
                    {rejectedInstitutes.map((institute) => (
                      <tr key={institute._id}>
                        <td data-label="Institute">{institute.instituteName}</td>
                        <td data-label="Wallet">
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td data-label="Status">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <FaBan /> Rejected
                          </span>
                        </td>
                        <td data-label="Action">
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
