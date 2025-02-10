import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../components/App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} PharmaPMS. All Rights Reserved.
          </p>
          <ul className="footer-links">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-icons">
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
