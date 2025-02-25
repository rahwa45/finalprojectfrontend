import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaFileMedical,
  FaMoneyBillWave,
  FaPrescriptionBottle,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./Style.css"; // Import custom CSS

const LandingPage = () => {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode on load
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="sign d-flex justify-content-between  align-items-center mb-5">
          <img
            src="/logo4.webp"
            alt="PharmaPMS Logo"
            style={{
              width: "70px",
              height: "70px",
              boxShadow: "0px 4px 2px green",
            }}
            className="rounded-circle"
          />

          {/* Dark Mode Toggle Button */}
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          <div className="d-flex gap-3">
            <Link to="/login" className="fs-5">
              Login
            </Link>

            <Link to="/signup" className="fs-5">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="container1">
          <div className="m-5">
            <h1 className="text-white">PharmaPMS</h1>
            <p className="text-white w-50">
              Welcome to PharmaPMS, your all-in-one Pharmacy Management System
              designed to streamline operations and improve efficiency.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn1">
                Get Started
              </Link>
              <Link to="/demo" className="btn btn2">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="m-5">
          <h2>About Us</h2>
          <p>
            PharmaPMS is designed to streamline your pharmacy operations, from
            inventory management to prescription records. Our goal is to provide
            a user-friendly platform that empowers pharmacists and ensures
            accurate, efficient, and organized management of your pharmacy.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features m-5">
        <div className="features_container ">
          <h2>Key Features</h2>

          <div className="feature-cards">
            <div className="card1">
              <FaBox className="icon" />
              <h3>Inventory Management</h3>
              <p>Track and manage your pharmacy inventory in real-time.</p>
            </div>

            <div className="card2">
              <FaMoneyBillWave className="icon" />
              <h3>Cashier Tasks</h3>
              <p>Accurately handle payments, including cash, and checks.</p>
            </div>
            <div className="card1">
              <FaPrescriptionBottle className="icon" />
              <h3>Prescription Management</h3>
              <p> Allowing for easy validation and tracking of prescriptions</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works m-5">
        <div className="container">
          <h2 className="text-start"> How It Works</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <h3>Sign Up</h3>
              <p>Create your account in a few simple steps.</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h3>Set Up</h3>
              <p>Add your pharmacy's details and start organizing.</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h3>Manage</h3>
              <p>
                Efficiently manage inventory, patient records, and cashier
                tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
            </ul>
          </div>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/">
            <FaFacebook />
          </a>
          <a href="https://x.com/">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/">
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
