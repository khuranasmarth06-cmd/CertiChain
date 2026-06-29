import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
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
              Blockchain Based
              <br />
              Academic Certificate Verifier
            </h1>
            <p>
              CertiChain enables educational institutions
              to issue, manage and verify academic
              certificates securely using Ethereum
              blockchain technology.
            </p>
            <div className="hero-buttons">
              <Link
                to="/verify"
                className="primary-btn"
              >
                Verify Certificate
              </Link>
              <Link
                to="/institute/login"
                className="secondary-btn"
              >
                Institute Portal
              </Link>
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
                ⛓
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
        {/* Portal Section */}
        <section className="portal-section">
          <h2>
            Choose Your Portal
          </h2>
          <p>
            Access the appropriate dashboard based on
            your role.
          </p>
          <div className="portal-grid">
            <Link
              to="/student/login"
              className="portal-card"
            >
              <h3>🎓 Student</h3>
              <p>
                View your certificates and
                verification status.
              </p>
            </Link>
            <Link
              to="/company/login"
              className="portal-card"
            >
              <h3>🏢 Company</h3>
              <p>
                Verify certificates issued by
                educational institutes.
              </p>
            </Link>
            <Link
              to="/institute/login"
              className="portal-card"
            >
              <h3>🏫 Institute</h3>
              <p>
                Issue and manage blockchain
                certificates.
              </p>
            </Link>
          </div>
        </section>
        <footer className="footer">
          <h3>
            CertiChain
          </h3>
          <p>
            Blockchain Based Academic Certificate
            Verification Platform
          </p>
        </footer>
      </div>
    </>
  );
}
export default Home;