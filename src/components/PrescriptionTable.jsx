import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Filter status
  const [searchQuery, setSearchQuery] = useState(""); // Search query for patient name
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
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

        console.log(response.data);
        setPrescriptions(response.data);
        setFilteredPrescriptions(response.data); // Set filteredPrescriptions initially to all
      } catch (error) {
        console.log("Error fetching prescriptions", error);
      }
    };

    fetchPrescriptions();
  }, [token, navigate]);

  // Filter prescriptions based on selected status
  const handleStatusFilterChange = (e) => {
    const filterStatus = e.target.value;
    setStatusFilter(filterStatus);

    if (filterStatus) {
      const filtered = prescriptions.filter(
        (prescription) => prescription.status === filterStatus
      );
      setFilteredPrescriptions(filtered);
    } else {
      setFilteredPrescriptions(prescriptions); // Show all if no filter selected
    }
  };

  // Filter prescriptions based on patient name
  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter prescriptions by patient name
    const filtered = prescriptions.filter((prescription) =>
      prescription.patientName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPrescriptions(filtered);
  };

  // Handle updating the prescription status
  const updateStatus = async (prescriptionId, newStatus) => {
    try {
      // Update state optimistically for a better UI experience
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.map((prescription) =>
          prescription._id === prescriptionId
            ? { ...prescription, status: newStatus }
            : prescription
        )
      );

      // Also update filteredPrescriptions to reflect the change immediately
      setFilteredPrescriptions((prevFilteredPrescriptions) =>
        prevFilteredPrescriptions.map((prescription) =>
          prescription._id === prescriptionId
            ? { ...prescription, status: newStatus }
            : prescription
        )
      );

      // Then, send the updated status to the backend
      await axios.put(
        `https://finalproject-backend-zagu.onrender.com/api/prescriptions/${prescriptionId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="m-4">
      <BackButton />
      <h2>Prescriptions</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          id="searchQuery"
          className="form-control rounded-4"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Enter patient name"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="mb-3">
        <label className="fs-5">Filter by Status:</label>
        <select
          id="statusFilter"
          className="m-2"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Dispensed">Dispensed</option>
        </select>
      </div>

      {/* Prescription Table */}
      <div
        className="table-container"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table className="table table-bordered shadow-sm  mb-5 ">
          <thead className="table-success">
            <tr>
              <th className=" fs-5 px-4">Patient name</th>
              <th className=" fs-5 px-4">Status</th>
              <th className=" fs-5 px-4">Drug details</th>
              <th className=" fs-5 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions?.map((prescription) => (
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
                  {/* Add status dropdown and Update button */}
                  <div>
                    {prescription.status === "Pending" && <td>Pending</td>}
                    {prescription.status === "Paid" && (
                      <select
                        value={prescription.status} // Set value to the prescription's current status
                        onChange={(e) =>
                          updateStatus(prescription._id, e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="Dispensed">Dispensed</option>
                      </select>
                    )}
                    {prescription.status === "Dispensed" && <td>Dispensed</td>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Link to Add Prescription */}
      <Link
        to={`/prescriptions/add`}
        className=""
        style={{
          padding: "10px",
          color: "white",
          textDecoration: "none",
          backgroundColor: "#0da912",
          borderRadius: "4px",
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
