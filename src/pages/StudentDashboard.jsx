import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CertificateCard from "../components/CertificateCard";
import useStudent from "../hooks/useStudent";
import useCertificate from "../hooks/useCertificate";
import "../styles/Dashboard.css";
import LogoutButton from "../components/LogoutButton";
function StudentDashboard() {
  const student = JSON.parse(
    localStorage.getItem("student")
  );
  if (!student) {
    return <Navigate to="/student/login" replace />;
  }
  const studentName = student.name;
  const {
    data: certificateIds,
    isLoading,
  } = useStudent();
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2 className="welcome-text">
            Welcome back, {studentName}
          </h2>
          <div className="dashboard-top">
            <h1>Student Dashboard</h1>
             <LogoutButton />
          </div>
          <p>
            View all certificates issued to your account.
          </p>
        </div>
        {isLoading && (
          <div className="loading-box">
            <p>Loading certificates...</p>
          </div>
        )}
        {!isLoading &&
          (!certificateIds || certificateIds.length === 0) && (
            <div className="empty-state">
              <h3>No Certificates Yet</h3>
              <p>
                Certificates issued by your institute
                will appear here.
              </p>
            </div>
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
  const {
    data: certificate,
    isLoading,
  } = useCertificate(certificateId);
  if (isLoading) {
    return (
      <div className="loading-box">
        Loading...
      </div>
    );
  }
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