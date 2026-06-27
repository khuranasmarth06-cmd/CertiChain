import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="hero-left">
            <span className="hero-tag">
              Blockchain • Secure • Decentralized
            </span>
            <h1>
              Blockchain Based  Academic
              <br />
              Certificate Verifier
            </h1>
            <p>
              CertiChain is a blockchain-powered platform
              that enables educational institutions to
              issue, manage and verify academic
              certificates securely using Ethereum smart
              contracts.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">
                Verify Certificate
              </button>
              <button className="secondary-btn">
                Institute Portal
              </button>
            </div>
            <div className="hero-highlights">
              <div>
                🔒
                <span>Tamper Proof</span>
              </div>
              <div>
                ⚡
                <span>Instant Verification</span>
              </div>
              <div>
                ⛓️
                <span>Blockchain Secured</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="Certificate"
            />
          </div>
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
        <footer className="footer">
          <h3>CertiChain</h3>
          <p>
            Blockchain Based Certificate Verification
            Platform
          </p>
        </footer>
      </div>
    </>
  );
}
export default Home;