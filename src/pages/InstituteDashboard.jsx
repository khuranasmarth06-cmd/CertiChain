import Navbar from "../components/Navbar";
import CertificateTable from "../components/CertificateTable";
import { certificates } from "../data/certificates";
import "../styles/Dashboard.css";
function InstituteDashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>
            Institute Dashboard
          </h1>
          <p>
            Issue and manage certificates.
          </p>
        </div>
        <div className="issue-form">
          <h2>
            Issue Certificate
          </h2>
          <input
            placeholder="Student Wallet Address"
          />
          <input
            placeholder="Student Name"
          />
          <input
            placeholder="Course Name"
          />
          <input
            placeholder="Grade"
          />
          <input type="date" />
          <button>
            Issue Certificate
          </button>
        </div>
        <div className="table-section">
          <h2>
            Issued Certificates
          </h2>
          <CertificateTable
            certificates={certificates}
          />
        </div>
      </div>
    </>
  );
}
export default InstituteDashboard;