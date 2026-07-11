import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaSearch, FaUniversity, FaUserGraduate, FaCode } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { FaInfoCircle } from "react-icons/fa";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">CertiChain</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/platform">
              Platform
            </Link>
          </li>
          <li>
            <Link to="/admin">
              Admin
            </Link>
          </li>
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>
      <div
        className={
          menuOpen
            ? "mobile-menu active"
            : "mobile-menu"
        }
      >
        <div className="mobile-header">
          <div className="sidebar-logo">
            <h2>CertChain</h2>
            <p>
              Academic Certificate Verification
            </p>
          </div>
          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/platform"
          onClick={() => setMenuOpen(false)}
        >
          <FaInfoCircle />
          <span>Platform</span>
        </Link>

        <Link
          to="/admin"
          onClick={() => setMenuOpen(false)}
        >
          <FaCode />
          <span>Admin</span>
        </Link>
        <div className="sidebar-footer">
          <p>CertChain v1.0</p>
        </div>
      </div>
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
export default Navbar;