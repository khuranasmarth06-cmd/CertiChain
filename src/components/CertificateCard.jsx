import StatusBadge from "./StatusBadge";
import { QRCodeCanvas } from "qrcode.react";
function CertificateCard({ certificate }) {
  const copyLink = () => {
    const url = `http://localhost:5173/verify?tokenId=${certificate.tokenId}`;
    navigator.clipboard.writeText(url);
    alert("Verification link copied!");
  };
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3>{certificate.course}</h3>
        <StatusBadge
          status={certificate.revoked ? "Revoked": "Valid"}
        />
      </div>
      <div className="certificate-body">
        <p>
          <strong>Student:</strong>{" "}
          {certificate.studentName}
        </p>
        <p>
          <strong>Course:</strong>{" "}
          {certificate.course}
        </p>
        <p>
          <strong>Grade:</strong>{" "}
          {certificate.grade}
        </p>
        <p>
          <strong>Token ID:</strong>{" "}
          {certificate.tokenId}
        </p>
        <div className="qr-section">
          <h4>Verification QR</h4>
          <QRCodeCanvas
            value={`http://localhost:5173/verify?tokenId=${certificate.tokenId}`}
            size={140}
          />
          <p className="qr-text">
            Scan to verify this certificate
          </p>
        </div>
      </div>
      <button onClick={copyLink}>
        Copy Verification Link
      </button>
    </div>
  );
}
export default CertificateCard;