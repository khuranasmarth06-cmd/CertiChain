import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
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
          <li>
            <Link to="/developer">
              Developer
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
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/verify"
          onClick={() => setMenuOpen(false)}
        >
          Verify
        </Link>
        <Link
          to="/institute"
          onClick={() => setMenuOpen(false)}
        >
          Institute
        </Link>
        <Link
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
        >
          Student
        </Link>
        <Link
          to="/developer"
          onClick={() => setMenuOpen(false)}
        >
          Developer
        </Link>
      </div>
    </>
  );
}
export default Navbar;