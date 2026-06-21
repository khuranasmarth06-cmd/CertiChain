import StatusBadge from "./StatusBadge";
function CertificateTable({
  certificates,
}) {
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
                status={cert.status}
              />
            </td>
            <td>
              <button
                className="revoke-btn"
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