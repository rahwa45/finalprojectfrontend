import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newStatus, setNewStatus] = useState(""); // State to hold the new status
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "https://finalproject-backend-eta.vercel.app/api/prescriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.log("Error fetching prescriptions", error);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  // Handle updating the prescription status
  const updateStatus = async (prescriptionId, newStatus) => {
    try {
      const response = await axios.put(
        `https://finalproject-backend-eta.vercel.app/api/prescriptions/${prescriptionId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      <h2>Prescriptions</h2>
      <table className="table table-bordered table-hover shadow-50 w-75 mb-5">
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
                        Drug: {drug.drugId?.name || "Unknown"} | Quantity:{" "}
                        {drug.quantity}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No drug details available</p>
                )}
              </td>

              <td>
                {/* Add status dropdown and Update button */}
                <div className="d-flex justify-content-center gap-x-4 align-items-center">
                  {prescription.status === "Pending" && (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Paid">Paid</option>
                    </select>
                  )}
                  {prescription.status === "Paid" && (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Dispensed">Dispensed</option>
                    </select>
                  )}
                  <button
                    onClick={() => updateStatus(prescription._id, newStatus)}
                    className="btn btn-primary"
                    disabled={!newStatus}
                  >
                    Update Status
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={`/prescriptions/add`}
        className=""
        style={{
          backgroundColor: "black",
          padding: "10px",
          color: "white",
          textDecoration: "none",
        }}
      >
        Add Prescription
      </Link>
      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default PrescriptionTable;
