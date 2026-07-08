import StatusBadge from "./StatusBadge";
import {revokeCertificate,expireCertificate,} from "../services/contractService";
function CertificateTable({ certificates }) {
  const getStatus = (status) => {
    switch (Number(status)) {
      case 0:
        return "Active";
      case 1:
        return "Revoked";
      case 2:
        return "Expired";
      default:
        return "Unknown";
    }
  };
  const handleRevoke = async (certificateId) => {
    try {
      const txHash = await revokeCertificate(certificateId);
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
  const handleExpire = async (certificateId) => {
    try {
      const txHash = await expireCertificate(certificateId);
      alert(`Certificate Expired!\n\n${txHash}`);
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
          <th>Grade</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert) => (
          <tr key={Number(cert.id)}>
            <td>{Number(cert.id)}</td>
            <td>{cert.studentName}</td>
            <td>{cert.course}</td>
            <td>{cert.grade}</td>
            <td>
              <StatusBadge
                status={getStatus(cert.status)}
              />
            </td>
            <td>
              {Number(cert.status) === 0 && (
                <>
                  <button
                    className="revoke-btn"
                    onClick={() =>
                      handleRevoke(Number(cert.id))
                    }
                  >
                    Revoke
                  </button>
                  <button
                    className="expire-btn"
                    onClick={() =>
                      handleExpire(Number(cert.id))
                    }
                  >
                    Expire
                  </button>
                </>
              )}
              {Number(cert.status) !== 0 && (
                <span>-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default CertificateTable;