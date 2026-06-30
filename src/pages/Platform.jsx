import Navbar from "../components/Navbar";
import "../styles/Platform.css";
function Platform() {
  return (
    <>
      <Navbar />
      <div className="platform-page">
        <section className="features">
          <h2>
            Why Choose CertChain?
          </h2>
          <p className="feature-subtitle">
            Built for educational institutions,
            students and recruiters with security,
            transparency and instant verification.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🔒 Tamper Proof</h3>
              <p>
                Certificates stored on blockchain
                cannot be modified or forged.
              </p>
            </div>
            <div className="feature-card">
              <h3>⛓ Blockchain Security</h3>
              <p>
                Every certificate is secured using
                Ethereum smart contracts.
              </p>
            </div>
            <div className="feature-card">
              <h3>📱 QR Verification</h3>
              <p>
                Scan the QR code to instantly verify
                certificate authenticity.
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ Instant Verification</h3>
              <p>
                Verify certificates within seconds
                without contacting the institute.
              </p>
            </div>
            <div className="feature-card">
              <h3>🚫 Certificate Revocation</h3>
              <p>
                Revoked certificates are detected
                immediately during verification.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎓 Blockchain Certificates</h3>
              <p>
                Every certificate is securely issued
                and recorded on the blockchain.
              </p>
            </div>
          </div>
        </section>
        <section className="workflow">
          <h2>
            How CertChain Works
          </h2>
          <p className="workflow-subtitle">
            A simple, secure and transparent
            certificate verification process.
          </p>
          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="workflow-icon">🏫</div>
              <h3>
                Institute Issues
              </h3>
              <p>
                The institute issues a blockchain
                certificate to the student.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">⛓</div>
              <h3>
                Blockchain Storage
              </h3>
              <p>
                Certificate details are securely
                stored on Ethereum.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">🎓</div>
              <h3>
                Student Receives
              </h3>
              <p>
                Students can access their
                certificates anytime.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">✅</div>
              <h3>
                Instant Verification
              </h3>
              <p>
                Recruiters or universities verify
                certificates using Token ID or QR.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Platform;