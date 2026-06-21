import Navbar from "../components/Navbar";
import CertificateCard from "../components/CertificateCard";
import { certificates }
from "../data/certificates";
import "../styles/Dashboard.css";
function StudentDashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>
            Student Dashboard
          </h1>
          <p>
            View all certificates issued
            to your account.
          </p>
        </div>
        <div className="certificate-grid">
          {certificates.map(
            (certificate) => (
              <CertificateCard
                key={certificate.tokenId}
                certificate={certificate}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
export default StudentDashboard;