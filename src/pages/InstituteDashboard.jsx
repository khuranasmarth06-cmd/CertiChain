import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import CertificateTable from "../components/CertificateTable";
import WalletConnect from "../components/WalletConnect";
import { issueCertificate,getAllCertificates } from "../services/contractService";
import "../styles/Dashboard.css";
function InstituteDashboard() {
    const [studentAddress, setStudentAddress] = useState("");
    const [studentName, setStudentName] = useState("");
    const [course, setCourse] = useState("");
    const [grade, setGrade] = useState("");
    const [certificates, setCertificates] = useState([]);

useEffect(() => {async function loadCertificates() {
    const data = await getAllCertificates();
    setCertificates(data);
  }
  loadCertificates();
}, []);
    const handleIssueCertificate = async () => {
    try {
        const txHash = await issueCertificate(studentAddress,studentName,course,grade);
        alert(`Certificate Issued Successfully!\n\nTransaction Hash:\n${txHash}`);
        setStudentAddress("");
        setStudentName("");
        setCourse("");
        setGrade("");
        } catch (error) {
              console.error(error);
             alert("Certificate issuance failed");
        }
};
return (
  <> 
  <Navbar />
  <div className="dashboard">
    <div className="dashboard-header">
      <div className="dashboard-top">
        <h1>Institute Dashboard</h1>
        <WalletConnect />
      </div>
      <p>Issue and manage certificates.</p>
    </div>
    <div className="issue-form">
      <h2>Issue Certificate</h2>
      <input
        type="text"
        placeholder="Student Wallet Address"
        value={studentAddress}
        onChange={(e) =>
          setStudentAddress(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) =>
          setStudentName(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Course Name"
        value={course}
        onChange={(e) =>
        setCourse(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) =>
          setGrade(e.target.value)
        }
      />
      <button
        onClick={handleIssueCertificate}
      >
        Issue Certificate
      </button>
    </div>
    <div className="table-section">
      <h2>Issued Certificates</h2>
      <CertificateTable
        certificates={certificates}
      />
    </div>
  </div>
  </>
);
}
export default InstituteDashboard;