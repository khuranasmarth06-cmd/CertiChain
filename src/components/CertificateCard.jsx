import StatusBadge from "./StatusBadge";
function CertificateCard({ certificate }) {
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3>{certificate.course}</h3>
        <StatusBadge
          status={certificate.status}
        />
      </div>
      <div className="certificate-body">
        <p>
          <strong>Student:</strong>{" "}
          {certificate.studentName}
        </p>
        <p>
          <strong>Institute:</strong>{" "}
          {certificate.institute}
        </p>
        <p>
          <strong>Grade:</strong>{" "}
          {certificate.grade}
        </p>
        <p>
          <strong>Token ID:</strong>{" "}
          {certificate.tokenId}
        </p>
      </div>
    </div>
  );
}
export default CertificateCard;