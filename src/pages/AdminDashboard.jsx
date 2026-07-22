import { useState } from "react";
import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import StatCard from "../components/StatCard";
import Spinner from "../components/Spinner";
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
  const [pending, setPending] = useState(null);
  const [activeTab, setActiveTab] = useState("pending"); // mobile-only tab switcher
  const ROW_LIMIT = 5;
  const [expanded, setExpanded] = useState({ pending: false, approved: false, rejected: false });
  const toggleExpanded = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleApprove = async (walletAddress) => {
    setPending({ wallet: walletAddress, action: "approve" });
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
    } finally {
      setPending(null);
    }
  };
  const handleReject = async (walletAddress) => {
    setPending({ wallet: walletAddress, action: "reject" });
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
    } finally {
      setPending(null);
    }
  };
  const handleRejectApproved = async (walletAddress) => {
    setPending({ wallet: walletAddress, action: "reject" });
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
    } finally {
      setPending(null);
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
        <div className="mobile-tabs">
          <button
            className={activeTab === "pending" ? "mobile-tab active" : "mobile-tab"}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({institutes.length})
          </button>
          <button
            className={activeTab === "approved" ? "mobile-tab active" : "mobile-tab"}
            onClick={() => setActiveTab("approved")}
          >
            Approved ({approvedInstitutes.length})
          </button>
          <button
            className={activeTab === "rejected" ? "mobile-tab active" : "mobile-tab"}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected ({rejectedInstitutes.length})
          </button>
        </div>
        <div className="tables-row">
          <div className={`table-section ${activeTab !== "pending" ? "mobile-hidden" : ""}`}>
            <h2>Pending Institute Requests</h2>
            {loading ? (
              <div className="loading-box">
                <Spinner />
                <span>Loading...</span>
              </div>
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
                    {(expanded.pending ? institutes : institutes.slice(0, ROW_LIMIT)).map((institute) => (
                      <tr key={institute._id}>
                        <td data-label="Institute">{institute.instituteName}</td>
                        <td data-label="Wallet">
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td data-label="Status">{institute.status}</td>
                        <td data-label="Action">
                          <div className="action-buttons">
                            <button
                              className="approve-btn btn-with-spinner"
                              disabled={pending?.wallet === institute.walletAddress}
                              onClick={() =>
                                handleApprove(
                                  institute.walletAddress
                                )
                              }
                            >
                              {pending?.wallet === institute.walletAddress &&
                                pending.action === "approve" && <Spinner />}
                              {pending?.wallet === institute.walletAddress &&
                              pending.action === "approve"
                                ? "Approving..."
                                : "Approve"}
                            </button>
                            <button
                              className="reject-btn btn-with-spinner"
                              disabled={pending?.wallet === institute.walletAddress}
                              onClick={() =>
                                handleReject(
                                  institute.walletAddress
                                )
                              }
                            >
                              {pending?.wallet === institute.walletAddress &&
                                pending.action === "reject" && <Spinner />}
                              {pending?.wallet === institute.walletAddress &&
                              pending.action === "reject"
                                ? "Rejecting..."
                                : "Reject"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {institutes.length > ROW_LIMIT && (
                  <button className="show-more-btn" onClick={() => toggleExpanded("pending")}>
                    {expanded.pending ? "Show less" : `Show all (${institutes.length})`}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={`table-section ${activeTab !== "approved" ? "mobile-hidden" : ""}`}>
            <h2>Approved Institutes</h2>
            {approvedLoading ? (
              <div className="loading-box">
                <Spinner />
                <span>Loading...</span>
              </div>
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
                    {(expanded.approved ? approvedInstitutes : approvedInstitutes.slice(0, ROW_LIMIT)).map((institute) => (
                      <tr key={institute._id}>
                        <td data-label="Institute">{institute.instituteName}</td>
                        <td data-label="Wallet">
                          {`${institute.walletAddress.slice(0,6)}...${institute.walletAddress.slice(-4)}`}
                        </td>
                        <td data-label="Status">Approved</td>
                        <td data-label="Action">
                          <div className="action-buttons">
                            <button
                              className="reject-btn btn-with-spinner"
                              disabled={pending?.wallet === institute.walletAddress}
                              onClick={() =>
                                handleRejectApproved(
                                  institute.walletAddress
                                )
                              }
                            >
                              {pending?.wallet === institute.walletAddress && (
                                <Spinner />
                              )}
                              {pending?.wallet === institute.walletAddress
                                ? "Rejecting..."
                                : "Reject"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {approvedInstitutes.length > ROW_LIMIT && (
                  <button className="show-more-btn" onClick={() => toggleExpanded("approved")}>
                    {expanded.approved ? "Show less" : `Show all (${approvedInstitutes.length})`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="tables-row" style={{ marginTop: "24px" }}>
          <div className={`table-section ${activeTab !== "rejected" ? "mobile-hidden" : ""}`}>
            <h2>Rejected Institutes</h2>
            {rejectedLoading ? (
              <div className="loading-box">
                <Spinner />
                <span>Loading...</span>
              </div>
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
                    {(expanded.rejected ? rejectedInstitutes : rejectedInstitutes.slice(0, ROW_LIMIT)).map((institute) => (
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
                              className="approve-btn btn-with-spinner"
                              disabled={pending?.wallet === institute.walletAddress}
                              onClick={() =>
                                handleApprove(
                                  institute.walletAddress
                                )
                              }
                            >
                              {pending?.wallet === institute.walletAddress && (
                                <Spinner />
                              )}
                              {pending?.wallet === institute.walletAddress
                                ? "Approving..."
                                : "Approve"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rejectedInstitutes.length > ROW_LIMIT && (
                  <button className="show-more-btn" onClick={() => toggleExpanded("rejected")}>
                    {expanded.rejected ? "Show less" : `Show all (${rejectedInstitutes.length})`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;