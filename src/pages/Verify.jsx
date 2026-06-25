import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import {getCertificate,isValidCertificate} from "../services/contractService";
import "../styles/Verify.css";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from "react-router-dom";
function Verify() {
       const [tokenId, setTokenId] = useState("");
       const [certificate, setCertificate] =
       useState(null);
       const [searchParams] =useSearchParams();
       useEffect(() => {
        const id =searchParams.get("tokenId");
        if (id) {
          setTokenId(id);
        }
        }, [searchParams]);
       const verifyCertificate=async () => {
       try {
            const cert=await getCertificate(tokenId);
            const valid =await isValidCertificate(tokenId);
            setCertificate({
                 id: Number(cert.id),
                 studentName:cert.studentName,
                 course: cert.course,
                 grade: cert.grade,
                 issuedAt:Number(cert.issuedAt),
                 revoked: !valid,
             });
        } catch (error) {
               console.error(error);
               alert("Certificate not found");
              setCertificate(null);
         }
};
useEffect(() => {
  if (tokenId) {
    verifyCertificate();
  }
}, [tokenId]);
return (
<> <Navbar />
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
        onClick={
          verifyCertificate
        }
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
            Certificate ID:
          </strong>{" "}
          {
            certificate.id
          }
        </p>
        <p>
          <strong>
            Issued At:
          </strong>{" "}
          {new Date(
            certificate.issuedAt *
              1000
          ).toLocaleDateString()}
        </p>
        <StatusBadge
          status={
            certificate.revoked
              ? "Revoked"
              : "Valid"
          }
        />
        <div className="qr-section">
          <h3>
            Verification QR
          </h3>
          <QRCodeCanvas
            value={`http://localhost:5173/verify?tokenId=${certificate.id}`}
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