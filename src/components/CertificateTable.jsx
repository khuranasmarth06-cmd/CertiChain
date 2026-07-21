import { useState } from "react";
import StatusBadge from "./StatusBadge";
import Spinner from "./Spinner";
import {revokeCertificate,expireCertificate,} from "../services/contractService";
function CertificateTable({ certificates }) {
  const [pending, setPending] = useState(null);
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
    setPending({ id: certificateId, action: "revoke" });
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
    } finally {
      setPending(null);
    }
  };
  const handleExpire = async (certificateId) => {
    setPending({ id: certificateId, action: "expire" });
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
    } finally {
      setPending(null);
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
                    className="revoke-btn btn-with-spinner"
                    disabled={pending?.id === Number(cert.id)}
                    onClick={() =>
                      handleRevoke(Number(cert.id))
                    }
                  >
                    {pending?.id === Number(cert.id) &&
                      pending.action === "revoke" && <Spinner />}
                    {pending?.id === Number(cert.id) &&
                    pending.action === "revoke"
                      ? "Revoking..."
                      : "Revoke"}
                  </button>
                  <button
                    className="expire-btn btn-with-spinner"
                    disabled={pending?.id === Number(cert.id)}
                    onClick={() =>
                      handleExpire(Number(cert.id))
                    }
                  >
                    {pending?.id === Number(cert.id) &&
                      pending.action === "expire" && <Spinner />}
                    {pending?.id === Number(cert.id) &&
                    pending.action === "expire"
                      ? "Expiring..."
                      : "Expire"}
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