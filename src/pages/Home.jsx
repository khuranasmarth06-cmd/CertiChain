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
        <section className="portal-section">
          <h2>
            Quick Access
          </h2>
          <p>
            Choose where you want to continue.
          </p>
          <div className="portal-grid">
            <Link
              to="/verify"
              className="portal-card"
            >
              <div className="portal-icon">
                🔍
              </div>
              <h3>Verify</h3>
            </Link>
            <Link
              to="/institute/login"
              className="portal-card"
            >
              <div className="portal-icon">
                🏫
              </div>
              <h3>Institute</h3>
            </Link>
            <Link
              to="/student/login"
              className="portal-card"
            >
              <div className="portal-icon">
                🎓
              </div>
              <h3>Student</h3>
            </Link>
            <Link
              to="/platform"
              className="portal-card"
            >
              <div className="portal-icon">
                🌐
              </div>
              <h3>Platform</h3>
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