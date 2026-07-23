import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import {getCertificate,isValidCertificate,getCertificateStatus,} from "../services/contractService";
import useCertificateIssuer from "../hooks/useCertificateIssuer";
import "../styles/Verify.css";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from "react-router-dom";
function Verify() {
  const [tokenId, setTokenId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [checking, setChecking] = useState(false);
  const [searchParams] = useSearchParams();
  const { instituteName, loading: loadingIssuer } = useCertificateIssuer(
    certificate?.id
  );
  useEffect(() => {
    const id = searchParams.get("tokenId");
    if (id) {
      setTokenId(id);
    }
  }, [searchParams]);
  const verifyCertificate = async () => {
    if (!tokenId) return;
    setChecking(true);
    setNotFound(false);
    try {
      const cert = await getCertificate(tokenId);
      const valid = await isValidCertificate(tokenId);
      const status = await getCertificateStatus(tokenId);
      setCertificate({
        id: Number(cert.id),
        studentName: cert.studentName,
        course: cert.course,
        grade: cert.grade,
        issuedAt: Number(cert.issuedAt),
        status,
        valid,
      });
    } catch (error) {
      console.error(error);
      setCertificate(null);
      setNotFound(true);
    } finally {
      setChecking(false);
    }
  };
  useEffect(() => {
    if (tokenId) {
      verifyCertificate();
    }
  }, [tokenId]);
  const BASE_URL = `${window.location.origin}${window.location.pathname.replace(/\/verify.*/, "")}`;
  const verifyUrl = certificate
    ? `${BASE_URL}#/verify?tokenId=${certificate.id}`
    : "";
  return (
    <>
      <Navbar />
      <div className="verify-container">
        <h1>Verify Certificate</h1>
        <p>Enter a certificate Token ID.</p>
        <div className="verify-form">
          <input
            type="number"
            placeholder="Enter Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button onClick={verifyCertificate} disabled={checking}>
            {checking ? "Checking..." : "Verify"}
          </button>
        </div>
        {notFound && <p>Certificate not found.</p>}
        {certificate && (
          <div className="verify-result">
            <h2>Certificate Found</h2>
            <p>
              <strong>Student:</strong> {certificate.studentName}
            </p>
            <p>
              <strong>Course:</strong> {certificate.course}
            </p>
            <p>
              <strong>Grade:</strong> {certificate.grade}
            </p>
            <p>
              <strong>Certificate ID:</strong> {certificate.id}
            </p>
            <p>
              <strong>Issued By:</strong>{" "}
              {loadingIssuer
                ? "Looking up institute..."
                : instituteName || "Unknown Institute"}
            </p>
            <p>
              <strong>Issued At:</strong>{" "}
              {new Date(certificate.issuedAt * 1000).toLocaleDateString()}
            </p>
            <StatusBadge status={certificate.status} />
            <p>
              {certificate.valid
                ? "This certificate is currently valid."
                : "This certificate is not currently valid (revoked or expired)."}
            </p>
            <div className="qr-section">
              <h3>Verification QR</h3>
              <QRCodeCanvas value={verifyUrl} size={150} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Verify;