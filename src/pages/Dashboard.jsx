import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Back from "../components/Back";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className=" p-5">
      <Back />
      <div className="mb-5">
        <div className="alert " role="alert">
          <h4>Welcome to the Dashboard!</h4>
        </div>

        <Navbar />
      </div>

      <div className="row">
        {/* Prescription Table Card */}
        <div className="col-md-6 mb-4">
          <div
            className="card text-white "
            style={{ cursor: "pointer", backgroundColor: "#057f09" }}
            onClick={() => navigate("/prescriptions")}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h2 className="card-title">Prescriptions</h2>
              <p className="card-text">View and manage prescriptions.</p>
            </div>
          </div>
        </div>
        {/* Drug Table Card */}
        <div className="col-md-6 mb-4">
          <div
            className="card h-100"
            style={{
              cursor: "pointer",
              transition: "transform 0.2s",
              color: "#057f09",
              border: "2px solid #057f09",
            }}
            onClick={() => navigate("/drugs")} // Redirect to Drug Table
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h2 className="card-title">Drug Inventory</h2>
              <p className="card-text">View and manage drug inventory.</p>
            </div>
          </div>
        </div>
        <div className="my-5"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
