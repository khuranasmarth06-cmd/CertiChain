import StatusBadge from "./StatusBadge";
function CertificateCard({ certificate }) {
    const copyLink = () => {
         const url =`http://localhost:5173/verify?tokenId=${certificate.tokenId}`;
         navigator.clipboard.writeText(url);
         alert("Verification link copied!");
    };
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3>{certificate.course}</h3>
        <StatusBadge
             status={certificate.revoked? "Revoked": "Valid"}
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
      <button onClick={copyLink}>
         Copy Verification Link
      </button>
    </div>
  );
}
export default CertificateCard;