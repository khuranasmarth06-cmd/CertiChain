import Navbar from "../components/Navbar";
import CertificateCard from "../components/CertificateCard";
import { useEffect, useState } from "react";
import { getAllCertificates } from "../services/contractService";
import "../styles/Dashboard.css";
import WalletConnect from "../components/WalletConnect";
function StudentDashboard() {
  const [certificates, setCertificates] = useState([]);
  useEffect(() => {
    const fetchCertificates = async () => {
      const certList = await getAllCertificates();
      setCertificates(certList);
    };
    fetchCertificates();
  }, []);
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-top">
               <h1>Student Dashboard</h1>
                <WalletConnect />
         </div>
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