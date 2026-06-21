import { useState } from "react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { certificates }
from "../data/certificates";
import "../styles/Verify.css";
import { QRCodeCanvas } from "qrcode.react";
function Verify() {
  const [tokenId, setTokenId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const verifyCertificate = () => {
    const result = certificates.find(
      (cert) =>
        cert.tokenId === Number(tokenId)
    );
    setCertificate(result || null);
  };
  return (
    <>
      <Navbar />
      <div className="verify-container">
        <h1>
          Verify Certificate
        </h1>
        <p>
          Enter a certificate Token ID.
        </p>
        <div className="verify-form">
          <input
            type="number"
            placeholder="Enter Token ID"
            value={tokenId}
            onChange={(e) =>
              setTokenId(
                e.target.value
              )
            }
          />
          <button
            onClick={verifyCertificate}
          >
            Verify
          </button>
        </div>
        {certificate && (
          <div className="verify-result">
            <h2>
              Certificate Found
            </h2>
            <p>
              <strong>
                Student:
              </strong>{" "}
              {
                certificate.studentName
              }
            </p>
            <p>
              <strong>
                Institute:
              </strong>{" "}
              {
                certificate.institute
              }
            </p>
            <p>
              <strong>
                Course:
              </strong>{" "}
              {
                certificate.course
              }
            </p>
            <p>
              <strong>
                Grade:
              </strong>{" "}
              {
                certificate.grade
              }
            </p>
            <p>
              <strong>
                Token ID:
              </strong>{" "}
              {
                certificate.tokenId
              }
            </p>
            <StatusBadge
             status={certificate.status}
            />
            <div className="qr-section">
                <h3>Verification QR</h3>
                <QRCodeCanvas
                  value={`http://localhost:5173/verify?tokenId=${certificate.tokenId}`}
                  size={150}
                 />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Verify;