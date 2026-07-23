import StatusBadge from "./StatusBadge";
import { QRCodeCanvas } from "qrcode.react";
import useCertificateIssuer from "../hooks/useCertificateIssuer";
function CertificateCard({ certificate, issuedBy }) {
  const certificateId = Number(certificate.id);
  const { instituteName: resolvedIssuer, loading: loadingIssuer } =
    useCertificateIssuer(issuedBy ? undefined : certificateId);
  const issuerName = issuedBy || resolvedIssuer;
const baseUrl = import.meta.env.VITE_FRONTEND_URL.replace(/\/$/, "");
const verificationUrl =`${baseUrl}/#/verify?certificateId=${certificateId}`;
  console.log(verificationUrl);
  const copyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    alert("Verification link copied!");
  };
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
  const formatDate = (timestamp) => {
    return new Date(
      Number(timestamp) * 1000
    ).toLocaleDateString();
  };
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3>{certificate.course}</h3>
        <StatusBadge
          status={getStatus(certificate.status)}
        />
      </div>
      <div className="certificate-body">
        <p>
          <strong>Student:</strong>{" "}
          {certificate.studentName}
        </p>
        <p>
          <strong>Wallet:</strong>{" "}
          {`${certificate.student.slice(0, 6)}...${certificate.student.slice(-4)}`}
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
          <strong>Certificate ID:</strong>{" "}
          {certificateId}
        </p>
        <p>
          <strong>Issued By:</strong>{" "}
          {issuedBy
            ? issuerName
            : loadingIssuer
            ? "Looking up institute..."
            : issuerName || "Unknown Institute"}
        </p>
        <p>
          <strong>Issued On:</strong>{" "}
          {formatDate(certificate.issuedAt)}
        </p>
        <div className="qr-section">
          <h4>Verification QR</h4>
          <QRCodeCanvas
            value={verificationUrl}
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