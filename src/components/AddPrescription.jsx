import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const AddPrescription = () => {
  const [patientName, setPatientName] = useState("");
  const [drugDetails, setDrugDetails] = useState([
    { drugId: "", quantity: "" },
  ]);
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDrugChange = (index, event) => {
    const values = [...drugDetails];
    values[index][event.target.name] = event.target.value.trim();
    setDrugDetails(values);
  };

  const handleAddDrug = () => {
    setDrugDetails([...drugDetails, { drugId: "", quantity: "" }]);
  };

  const handleRemoveDrug = (index) => {
    const values = [...drugDetails];
    values.splice(index, 1);
    setDrugDetails(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://finalproject-backend-eta.vercel.app/api/prescriptions",
        { patientName, drugDetails, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      navigate("/prescriptions"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };

  return (
    <div className="p-5">
      <BackButton />
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label>Patient Name:</label>
          <br />
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        {drugDetails.map((drug, index) => (
          <div key={index}>
            <div>
              <label>Drug ID:</label>
              <br />
              <input
                type="text"
                name="drugId"
                value={drug.drugId}
                onChange={(e) => handleDrugChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Quantity:</label>
              <br />
              <input
                type="number"
                name="quantity"
                value={drug.quantity}
                onChange={(e) => handleDrugChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-start w-50">
          <button
            type="button"
            onClick={handleAddDrug}
            className="p-2"
            style={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
            }}
          >
            Add Drug
          </button>
          <button
            type="button"
            onClick={() => handleRemoveDrug(index)}
            className="p-2"
            style={{ backgroundColor: "red", color: "white", border: "none" }}
          >
            Remove Drug
          </button>
        </div>
        <br />
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Dispensed">Dispensed</option>
          </select>
          <br /> <br />
        </div>
        <button type="submit" className="p-2 bg-warning text-white fs-5">
          Submit Prescription
        </button>
      </form>
      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default AddPrescription;
