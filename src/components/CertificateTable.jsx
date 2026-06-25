import StatusBadge from "./StatusBadge";
import { revokeCertificate } from "../services/contractService";
function CertificateTable({certificates}) {
  const handleRevoke=async (certificateId) => {
    try {
      const txHash =await revokeCertificate( certificateId);
      alert(`Certificate Revoked!\n\n${txHash}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error.shortMessage ||
        error.reason ||
        error.message
      );
    }
  };
  return (
    <table className="certificate-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Student</th>
          <th>Course</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert) => (
          <tr key={cert.tokenId}>
            <td>{cert.tokenId}</td>
            <td>
              {cert.studentName}
            </td>
            <td>{cert.course}</td>
            <td>
              <StatusBadge
                 status={cert.revoked? "Revoked": "Valid"}
              />
            </td>
            <td>
              <button
                className="revoke-btn"
                onClick={() =>handleRevoke(cert.tokenId)}
              >
                Revoke
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default CertificateTable;