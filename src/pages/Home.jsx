import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaBolt, FaLink, FaSearch, FaUniversity, FaUserGraduate, FaGlobe } from "react-icons/fa";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="hero-left">
            <span className="hero-tag">Registrar-grade · on-chain</span>
            <h1>
              A certificate that
              <br />
              can't be forged.
            </h1>
            <p>
              CertiChain lets institutions issue academic credentials that
              write directly to the Ethereum ledger, so anyone can confirm
              a certificate is genuine without ever calling the registrar's
              office.
            </p>
            <div className="hero-highlights">
              <div>
                <FaShieldAlt />
                <span>Tamper-evident by design</span>
              </div>
              <div>
                <FaBolt />
                <span>Verified in seconds</span>
              </div>
              <div>
                <FaLink />
                <span>Anchored on Ethereum</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/verify" className="btn-seal">Verify a certificate</Link>
              <Link to="/institute/login" className="btn-outline">Issue as an institute</Link>
            </div>
          </div>

          <div className="hero-right">
            <svg viewBox="0 0 360 300" className="cert-illustration" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a sealed digital certificate">
              <defs>
                <pattern id="guilloche" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--primary)" strokeOpacity="0.18" strokeWidth="0.6" />
                </pattern>
              </defs>

              <rect x="34" y="16" width="270" height="230" rx="4" fill="var(--surface-raised)" stroke="var(--border)" transform="rotate(-4 169 131)" />

              <g transform="rotate(2 180 140)">
                <rect x="40" y="30" width="270" height="230" rx="6" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="1.5" />
                <rect x="40" y="30" width="270" height="230" rx="6" fill="url(#guilloche)" />
                <rect x="54" y="46" width="242" height="198" rx="2" fill="none" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="1 4" />

                <text x="175" y="76" textAnchor="middle" fontFamily="var(--font-display)" fontSize="17" fontWeight="600" fill="var(--text)">Certificate of Completion</text>
                <line x1="90" y1="90" x2="260" y2="90" stroke="var(--hairline)" strokeWidth="1" />

                <text x="175" y="120" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--secondary-text)">AWARDED TO</text>
                <text x="175" y="142" textAnchor="middle" fontFamily="var(--font-display)" fontSize="19" fill="var(--text)">Smarth Khurana</text>

                <text x="175" y="168" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--secondary-text)">Distributed Systems — Grade A</text>

                <circle cx="175" cy="210" r="26" fill="var(--primary-tint)" stroke="var(--primary)" strokeWidth="1.5" />
                <circle cx="175" cy="210" r="19" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M167 210 l6 6 12 -13" fill="none" stroke="var(--primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

                <text x="175" y="256" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--faint-text)">0x7c3a…e91f verified on-chain</text>
              </g>
            </svg>
          </div>
        </section>

        <section className="portal-section">
          <h2>Where do you fit in?</h2>
          <p>Every certificate has three sides — the issuer, the holder, and whoever's checking.</p>
          <div className="portal-grid">
            <Link to="/verify" className="portal-card">
              <span className="portal-index">01</span>
              <FaSearch className="portal-icon" />
              <h3>Verify</h3>
              <p>Check any certificate ID or QR code against the chain.</p>
            </Link>
            <Link to="/institute/login" className="portal-card">
              <span className="portal-index">02</span>
              <FaUniversity className="portal-icon" />
              <h3>Institute</h3>
              <p>Issue, manage and revoke credentials for your students.</p>
            </Link>
            <Link to="/student/login" className="portal-card">
              <span className="portal-index">03</span>
              <FaUserGraduate className="portal-icon" />
              <h3>Student</h3>
              <p>Hold your certificates in your wallet and share them at will.</p>
            </Link>
            <Link to="/platform" className="portal-card">
              <span className="portal-index">04</span>
              <FaGlobe className="portal-icon" />
              <h3>Platform</h3>
              <p>See how issuing, storage and verification fit together.</p>
            </Link>
          </div>
        </section>

        <footer className="footer">
          <h3>CertiChain</h3>
          <p>Academic credentials, issued once and verifiable forever.</p>
        </footer>
      </div>
    </>
  );
}
export default Home;
