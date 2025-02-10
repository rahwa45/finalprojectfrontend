import React from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaFileMedical,
  FaMoneyBillWave,
  FaPrescriptionBottle,
} from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}

      <section className="hero">
        <div className="sign">
          <p className="link">
            <Link to="/login">Login</Link>
          </p>
          <p>
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <div className="container1">
          <div>
            <h1>Welcome to PharmaPMS</h1>
            <p>Manage your pharmacy efficiently with our easy-to-use system.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn1">
                Get Started
              </Link>
              <Link to="/demo" className="btn btn2">
                Learn More
              </Link>
            </div>
            <div className="auth-links">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
          <div>
            {" "}
            <img
              src="/pharmacy2.png"
              alt=""
              style={{ width: "400px", height: "400px" }}
              className="rounded-circle"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>
            PharmaPMS is designed to streamline your pharmacy operations, from
            inventory management to prescription records. Our goal is to provide
            a user-friendly platform that empowers pharmacists and ensures
            accurate, efficient, and organized management of your pharmacy.
          </p>
          <p>
            With a focus on simplicity and reliability, we are here to help you
            deliver better healthcare services while saving time and reducing
            stress.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-cards">
            <div className="card1">
              <FaBox className="icon" />
              <h3>Inventory Management</h3>
              <p>Track and manage your pharmacy inventory in real-time.</p>
            </div>
            <div className="card2">
              <FaFileMedical className="icon" />
              <h3>Patient Records</h3>
              <p>
                Secure and easy access to patient history and prescriptions.
              </p>
            </div>
            <div className="card1">
              <FaMoneyBillWave className="icon" />
              <h3>Chashier Tasks</h3>
              <p>Cashier system.</p>
            </div>
            <div className="card1">
              <FaPrescriptionBottle className="icon" />
              <h3>Prescription Lists</h3>
              <p>Prescription system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}

      <section id="how-it-works" className="how-it-works">
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
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100093989906259&mibextid=ZbWKw">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/rahwa-gebresilassie">
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
