import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import CertificateTable from "../components/CertificateTable";
import WalletConnect from "../components/WalletConnect";
import {
  issueCertificate,
  getMyIssuedCertificates,
  addInstitute,
  removeInstitute,
  verifyCertificateHash,
  generateCertificateHash,
} from "../services/contractService";
import { useAccount } from "wagmi";
import "../styles/Dashboard.css";
import LogoutButton from "../components/LogoutButton";
function InstituteDashboard() {
  const { isConnected } = useAccount();
  const institute = JSON.parse(
    localStorage.getItem("institute")
  );
  const instituteName = institute?.instituteName || "Institute";
  const [studentAddress, setStudentAddress] = useState("");
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [issuing, setIssuing] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [instituteAddress, setInstituteAddress] = useState("");
  const [managingInstitute, setManagingInstitute] = useState(false);
  const [hashCheckId, setHashCheckId] = useState({
    studentName: "",
    course: "",
    grade: "",
    studentAddress: "",
  });
  const [hashResult, setHashResult] = useState(null);
  const [checkingHash, setCheckingHash] = useState(false);
  const loadCertificates = useCallback(async () => {
    if (!isConnected) {
      setCertificates([]);
      return;
    }
    setLoadingCertificates(true);
    try {
      const data = await getMyIssuedCertificates();
      setCertificates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCertificates(false);
    }
  }, [isConnected]);
  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);
  const handleIssueCertificate = async () => {
    setIssuing(true);
    try {
      const txHash = await issueCertificate(
        studentAddress,
        studentName,
        course,
        grade
      );
      alert(`Certificate Issued Successfully!\n\nTransaction Hash:\n${txHash}`);
      setStudentAddress("");
      setStudentName("");
      setCourse("");
      setGrade("");
      await loadCertificates();
    } catch (error) {
      console.error(error);
      alert(error.shortMessage || error.message || "Certificate issuance failed");
    } finally {
      setIssuing(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2 className="welcome-text">
            👋 Welcome, {instituteName}
          </h2>
          <div className="dashboard-top">
            <h1>Institute Dashboard</h1>
            <LogoutButton />
          </div>
          <p>
            Issue and manage certificates.
          </p>
        </div>
        <div className="issue-form">
          <h2>Issue Certificate</h2>
          <input
            type="text"
            placeholder="Student Wallet Address"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button onClick={handleIssueCertificate} disabled={issuing}>
            {issuing ? "Issuing..." : "Issue Certificate"}
          </button>
        </div>
        <div className="table-section">
          <h2>Issued Certificates</h2>
          {loadingCertificates && <p>Loading certificates...</p>}
          {!loadingCertificates && (
            <CertificateTable
              certificates={certificates}
              onChanged={loadCertificates}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default InstituteDashboard;