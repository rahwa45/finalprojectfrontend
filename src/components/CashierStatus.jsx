import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "https://finalproject-backend-zagu.onrender.com/api/prescriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter to show only Pending prescriptions for the cashier
        const pendingPrescriptions = response.data.filter(
          (prescription) => prescription.status === "Pending"
        );
        setPrescriptions(pendingPrescriptions);
      } catch (error) {
        console.log("Error fetching prescriptions", error);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  // Handle updating the prescription status for individual prescription
  const updateStatus = async (prescriptionId, newStatus) => {
    try {
      const response = await axios.put(
        `https://finalproject-backend-zagu.onrender.com/api/prescriptions/${prescriptionId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the specific prescription in the state with the new status
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.map((prescription) =>
          prescription._id === prescriptionId
            ? { ...prescription, status: response.data.status }
            : prescription
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-5">
      <BackButton />
      <h2>Prescription</h2>
      <table className="table table-bordered table-hover shadow-50 w-75">
        <thead className="table-danger">
          <tr>
            <th className="border fs-5 text-center">Patient name</th>
            <th className="border fs-5 text-center">Status</th>
            <th className="border fs-5 text-center">Drug details</th>
            <th className="border fs-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions?.map((prescription) => (
            <tr key={prescription._id}>
              <td>{prescription.patientName}</td>
              <td>{prescription.status}</td>
              <td>
                {prescription.drugDetails &&
                prescription.drugDetails.length > 0 ? (
                  prescription.drugDetails.map((drug, index) => (
                    <div key={index}>
                      <p>
                        Drug: {drug.drugId.name} | Quantity: {drug.quantity}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No drug details available</p>
                )}
              </td>
              <td>
                {/* Add status dropdown and Update button for each individual prescription */}
                {prescription.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(prescription._id, "Paid")}
                    className="btn btn-primary"
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex align-items-end foot">
        <Footer />
      </div>
    </div>
  );
};

export default PrescriptionTable;
