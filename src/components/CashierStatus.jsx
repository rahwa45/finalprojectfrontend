import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Back from "./Back";
import Footer from "./Footer";

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [currentPage, setCurrentPage] = useState(1);
  const [prescriptionsPerPage] = useState(10); // 10 prescriptions per page
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

        // Show only "Pending" prescriptions
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

  // Update prescription status
  const updateStatus = async (prescriptionId, newStatus) => {
    try {
      const response = await axios.put(
        `https://finalproject-backend-zagu.onrender.com/api/prescriptions/${prescriptionId}`,
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

  // 🔎 Filter prescriptions based on search query
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📌 Pagination Logic
  const indexOfLastPrescription = currentPage * prescriptionsPerPage;
  const indexOfFirstPrescription =
    indexOfLastPrescription - prescriptionsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(
    indexOfFirstPrescription,
    indexOfLastPrescription
  );
  const totalPages = Math.ceil(
    filteredPrescriptions.length / prescriptionsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-5">
      <Back />
      <div className="d-flex flex-row w-75">
        <h2>Prescription</h2>

        {/* 🔎 Search Input */}
        <div className="mb-3 w-50 mx-auto">
          <input
            type="text"
            className="form-control rounded-4"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-danger">
          <tr>
            <th className="border fs-5 px-4">Patient name</th>
            <th className="border fs-5 px-4">Status</th>
            <th className="border fs-5 px-4">Drug details</th>
            <th className="border fs-5 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPrescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td className="px-4">{prescription.patientName}</td>
              <td className="px-4">{prescription.status}</td>
              <td className="px-4">
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
              <td className="px-4">
                {prescription.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(prescription._id, "Paid")}
                    style={{
                      padding: "5px 5px",
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "#0da912",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📌 Pagination Controls */}
      <div className=" mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-end foot">
        <Footer />
      </div>
    </div>
  );
};

export default PrescriptionTable;
