import Navbar from "../components/Navbar";
import { FaShieldAlt, FaLink, FaQrcode, FaBolt, FaUniversity, FaCube, FaUserGraduate, FaCheckCircle, FaBook } from "react-icons/fa";
import "../styles/Platform.css";

function Platform() {
  return (
    <>
      <Navbar />
      <div className="platform-page">
        <section className="features">
          <h2>Built for three audiences, one record</h2>
          <p className="feature-subtitle">
            Institutions issue, students hold, and anyone verifying a
            credential reads the same immutable entry — no phone calls
            to the registrar required.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <FaShieldAlt className="feature-icon" />
              <h3>Tamper-evident</h3>
              <p>Once written, a certificate's data can't be altered or forged — any edit would break the chain.</p>
            </div>
            <div className="feature-card">
              <FaLink className="feature-icon" />
              <h3>Anchored on Ethereum</h3>
              <p>Every credential is recorded on-chain, independent of CertiChain's own servers staying online.</p>
            </div>
            <div className="feature-card">
              <FaQrcode className="feature-icon" />
              <h3>QR verification</h3>
              <p>Each certificate carries a scannable code that opens straight to its verification record.</p>
            </div>
            <div className="feature-card">
              <FaBolt className="feature-icon" />
              <h3>Verified in seconds</h3>
              <p>No paperwork, no waiting on an institution's admin office to confirm authenticity.</p>
            </div>
          </div>
        </section>

        <section className="workflow">
          <h2>How a certificate moves</h2>
          <p className="workflow-subtitle">
            Four steps, each one a ledger entry the next step can check.
          </p>
          <div className="workflow-grid">
            <div className="workflow-card">
              <span className="workflow-step">01</span>
              <FaUniversity className="workflow-icon" />
              <h3>Institute issues</h3>
              <p>A registrar submits the student's record and signs the transaction.</p>
            </div>
            <div className="workflow-card">
              <span className="workflow-step">02</span>
              <FaCube className="workflow-icon" />
              <h3>Blockchain stores</h3>
              <p>The certificate is written to Ethereum with a unique, permanent ID.</p>
            </div>
            <div className="workflow-card">
              <span className="workflow-step">03</span>
              <FaUserGraduate className="workflow-icon" />
              <h3>Student receives</h3>
              <p>The credential appears in the student's dashboard, ready to share.</p>
            </div>
            <div className="workflow-card">
              <span className="workflow-step">04</span>
              <FaCheckCircle className="workflow-icon" />
              <h3>Anyone verifies</h3>
              <p>An ID, wallet address or QR scan confirms it in seconds.</p>
            </div>
          </div>
        </section>

        <section className="guide-cta">
          <h2>Need a walkthrough?</h2>
          <p className="guide-cta-subtitle">
            Step-by-step instructions for institutes, students, and admins — issuing,
            claiming, and verifying certificates.
          </p>
          <a
            href="https://github.com/khuranasmarth06-cmd/CertiChain/blob/main/Userguid.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-seal"
          >
            <FaBook style={{ marginRight: "8px" }} />
            Read the User Guide
          </a>
        </section>
      </div>
    </>
  );
}
export default Platform;