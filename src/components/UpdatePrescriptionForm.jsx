import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePrescriptionForm = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Fetch prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5559/api/prescriptions"
        ); // API endpoint to fetch prescriptions
        setPrescriptions(response.data);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      }
    };
    fetchPrescriptions();
  }, []);

  // Handle status change
  const handleStatusChange = async () => {
    if (!status) {
      setError("Please select a valid status.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5559/api/prescriptions/${selectedPrescription._id}`,
        { status }
      );
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.map((prescription) =>
          prescription._id === selectedPrescription._id
            ? { ...prescription, status: response.data.status }
            : prescription
        )
      );
      setStatus(""); // Reset status selection
      setSelectedPrescription(null); // Reset selection
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status.");
    }
  };

  return (
    <div>
      <h2>Update Prescription Status</h2>

      <div>
        <h3>Select Prescription:</h3>
        <select
          value={selectedPrescription ? selectedPrescription._id : ""}
          onChange={(e) => {
            const selected = prescriptions.find(
              (p) => p._id === e.target.value
            );
            setSelectedPrescription(selected);
            setStatus(selected ? selected.status : "");
            setError("");
          }}
        >
          <option value="">Select a prescription</option>
          {prescriptions.map((prescription) => (
            <option key={prescription._id} value={prescription._id}>
              {prescription.patientName} - {prescription.status}
            </option>
          ))}
        </select>
      </div>

      {selectedPrescription && (
        <div>
          <h3>Current Status: {selectedPrescription.status}</h3>
          <div>
            <label>Status: </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              {selectedPrescription.status === "Pending" && (
                <option value="Paid">Paid</option>
              )}
              {selectedPrescription.status === "Paid" && (
                <option value="Dispensed">Dispensed</option>
              )}
            </select>
          </div>
          <button onClick={handleStatusChange}>Update Status</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdatePrescriptionForm;
