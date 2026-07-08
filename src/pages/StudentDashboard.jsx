import Navbar from "../components/Navbar";
import WalletConnect from "../components/WalletConnect";
import CertificateCard from "../components/CertificateCard";
import { useAccount } from "wagmi";
import useStudent from "../hooks/useStudent";
import useCertificate from "../hooks/useCertificate";
import "../styles/Dashboard.css";
function StudentDashboard() {
  const { isConnected } = useAccount();
  const {data: certificateIds,isLoading,} = useStudent();
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
            View all certificates issued to your account.
          </p>
        </div>
        {!isConnected && (
          <p>
            Connect your wallet to view your certificates.
          </p>
        )}
        {isConnected && isLoading && (
          <p>Loading certificates...</p>
        )}
        {isConnected &&
          !isLoading &&
          certificateIds?.length === 0 && (
            <p>No certificates found.</p>
          )}
        <div className="certificate-grid">
          {certificateIds?.map((id) => (
            <CertificateItem
              key={Number(id)}
              certificateId={Number(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
function CertificateItem({ certificateId }) {
  const {data: certificate,isLoading,} = useCertificate(certificateId);
  if (isLoading) {return <p>Loading...</p>;}
  if (!certificate) {
    return null;
  }
  return (
    <CertificateCard
      certificate={certificate}
    />
  );
}
export default StudentDashboard;