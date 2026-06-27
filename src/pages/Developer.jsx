import Navbar from "../components/Navbar";
import "../styles/Developer.css";
function Developer() {
  return (
    <>
      <Navbar />
      <div className="developer-page">
        <div className="developer-card">
          <h1>
            About the Developer
          </h1>
          <div className="developer-info">
            <h2>
              Smarth Khurana
            </h2>
            <p>
              <strong>University:</strong>{" "}
              Jaypee Institute of Information Technology (JIIT), Noida
            </p>
            <p>
              <strong>Course:</strong>{" "}
              B.Tech Computer Science Engineering
            </p>
            <p>
              <strong>Year:</strong>{" "}
              Third Year
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/khuranasmarth06-cmd"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/khuranasmarth06-cmd
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/smarth-khurana-546907311"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/smarth-khurana-546907311
              </a>
            </p>
          </div>
          <div className="developer-message">
            <h3>
              Developer Message
            </h3>
            <p>
              Thank you for visiting CertChain.
              <br /><br />
              This project was developed to
              demonstrate how blockchain
              technology can be used to build a
              secure, transparent and tamper-proof
              academic certificate verification
              system.
              <br /><br />
              I hope this project showcases the
              potential of Web3 technologies in
              transforming the way educational
              institutions issue and verify
              academic credentials.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Developer;