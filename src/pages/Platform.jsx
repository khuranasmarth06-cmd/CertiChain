import Navbar from "../components/Navbar";
import "../styles/Platform.css";
function Platform() {
  return (
    <>
      <Navbar />
      <div className="platform-page">
        <section className="platform-hero">
          <h1>
            About CertChain
          </h1>
          <p>
            A blockchain-powered platform for issuing,
            managing and verifying academic certificates
            securely.
          </p>
        </section>
        <section className="features">
          <h2>Why Choose CertiChain?</h2>
          <p className="feature-subtitle">
            Built for educational institutions,
            students and employers with security,
            transparency and instant verification in
            mind.
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
                Every certificate is secured by
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
                Invalid or revoked certificates are
                detected immediately.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎓 NFT Certificates</h3>
              <p>
                Every academic certificate is issued
                as a unique blockchain asset.
              </p>
            </div>
          </div>
        </section>
         <section className="workflow">
          <h2>How CertChain Works</h2>
          <p className="workflow-subtitle">
            A simple, secure and transparent certificate verification process powered by blockchain.
          </p>
          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="workflow-icon">🏫</div>
              <h3>Institute Issues</h3>
              <p>
                The institute issues a blockchain-backed academic certificate to a student.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">⛓️</div>
              <h3>Blockchain Storage</h3>
              <p>
                Certificate information is securely stored on the Ethereum blockchain.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">🎓</div>
              <h3>Student Receives</h3>
              <p>
                Students receive their certificate and can access it anytime.
              </p>
            </div>
            <div className="workflow-arrow">
              ➜
            </div>
            <div className="workflow-card">
              <div className="workflow-icon">✅</div>
              <h3>Verify Instantly</h3>
              <p>
                Companies or universities verify certificates instantly using Token ID or QR Code.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Platform;