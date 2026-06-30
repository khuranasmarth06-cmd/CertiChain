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
                Certificates cannot be modified or forged once issued.
              </p>
            </div>

            <div className="feature-card">
              <h3>⛓ Blockchain Security</h3>
              <p>
                Certificate data is securely stored on Ethereum.
              </p>
            </div>

            <div className="feature-card">
              <h3>📱 QR Verification</h3>
              <p>
                Verify certificates instantly using a QR code.
              </p>
            </div>

            <div className="feature-card">
              <h3>⚡ Instant Verification</h3>
              <p>
                Authenticate certificates in just a few seconds.
              </p>
            </div>

          </div>
        </section>
        <div className="workflow-card">
          <div className="workflow-icon">🏫</div>
          <h3>Institute</h3>
          <p>Issues certificate.</p>
        </div>

        <div className="workflow-arrow">➜</div>

        <div className="workflow-card">
          <div className="workflow-icon">⛓</div>
          <h3>Blockchain</h3>
          <p>Stores certificate.</p>
        </div>

        <div className="workflow-arrow">➜</div>

        <div className="workflow-card">
          <div className="workflow-icon">🎓</div>
          <h3>Student</h3>
          <p>Receives certificate.</p>
        </div>

        <div className="workflow-arrow">➜</div>

        <div className="workflow-card">
          <div className="workflow-icon">✅</div>
          <h3>Verification</h3>
          <p>Verified instantly.</p>
        </div>
      </div>
    </>
  );
}
export default Platform;