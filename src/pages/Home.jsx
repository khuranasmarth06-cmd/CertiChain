import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="hero-left">
            <h1>
              Blockchain Academic Certificate
              Verification System
            </h1>
            <p>
              Securely issue, manage and verify
              certificates using blockchain
              technology.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">
                Verify Certificate
              </button>
              <button className="secondary-btn">
                Institute Portal
              </button>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="certificate"
            />
          </div>
        </section>
        <section className="features">
          <h2>
            Why Choose CertChain?
          </h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Secure</h3>
              <p>
                Protected by blockchain.
              </p>
            </div>
            <div className="feature-card">
              <h3>Instant Verification</h3>
              <p>
                Verify certificates instantly.
              </p>
            </div>
            <div className="feature-card">
              <h3>Tamper Proof</h3>
              <p>
                Certificates cannot be altered.
              </p>
            </div>
          </div>
        </section>
        <footer className="footer">
          <h3>CertChain</h3>
          <p>
            Blockchain Certificate Verification
            Platform
          </p>
        </footer>
      </div>
    </>
  );
}
export default Home;