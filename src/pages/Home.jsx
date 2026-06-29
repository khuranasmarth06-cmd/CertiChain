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