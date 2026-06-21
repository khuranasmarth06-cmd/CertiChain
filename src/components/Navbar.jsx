import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          CertChain
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/verify">
            Verify
          </Link>
        </li>
        <li>
          <Link to="/institute">
            Institute
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            Student
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;