import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackLinkk from "./BackLinkk.jsx";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const AddPrescription = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [patientName, setPatientName] = useState("");
  const [prescriptionDrafts, setPrescriptionDrafts] = useState([]); // Store drafted prescriptions
  const [drugDetails, setDrugDetails] = useState([]); // Store drugs added to current prescription
  const [status, setStatus] = useState("Pending");
  const [query, setQuery] = useState(""); // Search input
  const [drugs, setDrugs] = useState([]); // Fetched drugs
  const [noResults, setNoResults] = useState(false); // State to track no results
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch drugs as user types
  useEffect(() => {
    const fetchDrugs = async () => {
      if (!query.trim()) {
        setDrugs([]);
        setNoResults(false); // Reset no results state
        return;
      }

      try {
        const { data } = await axios.get(
          "https://finalproject-backend-zagu.onrender.com/api/drugs",
          {
            params: { query },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNoResults(data.length === 0);
        setDrugs(data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };

    const delayDebounce = setTimeout(fetchDrugs, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, token]);

  // Add selected drug to the current prescription
  const handleSelectDrug = (drug) => {
    const newDrug = { drugId: drug._id, drugName: drug.name, quantity: "" };
    setDrugDetails((prevDetails) => [...prevDetails, newDrug]);
    setQuery(""); // Clear search query after selection
    setDrugs([]); // Clear the search results
  };

  const handleDrugChange = (index, event) => {
    const values = [...drugDetails];
    values[index][event.target.name] = event.target.value.trim();
    setDrugDetails(values);
  };

  // Remove drug from current prescription
  const handleRemoveDrug = (index) => {
    const values = [...drugDetails];
    values.splice(index, 1);
    setDrugDetails(values);
  };

  const handleAddPrescriptionDraft = (event) => {
    event.preventDefault();
    if (!patientName || drugDetails.length === 0) {
      enqueueSnackbar("Please enter a patient name and add at least one drug.");
      return;
    }

    const newPrescription = { patientName, drugDetails, status };
    setPrescriptionDrafts((prev) => [...prev, newPrescription]);

    // Clear the current prescription details for new entry
    setPatientName("");
    setDrugDetails([]);
    setStatus("Pending");
  };

  const handleSubmitAllPrescriptions = async () => {
    setLoading(true);
    try {
      for (const prescription of prescriptionDrafts) {
        await axios.post(
          "https://finalproject-backend-zagu.onrender.com/api/prescriptions",
          prescription,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // Clear all drafts after successful submission
      setPrescriptionDrafts([]);
      enqueueSnackbar("All prescriptions submitted successfully.");
      // Optionally navigate to another page
      // navigate("/prescriptions");
      navigate("/prescriptions");
    } catch (error) {
      console.error("Error adding prescriptions:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={50} color={"#3498db"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="p-5">
      <BackLinkk />

      <h2>Add Prescription</h2>
      <form onSubmit={handleAddPrescriptionDraft} className="">
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

        <div>
          <label>Search Drug:</label>
          <br />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type drug name..."
          />

          {/* Show search results */}
          {noResults && query.trim() !== "" && <p>No drugs found</p>}

          {drugs.length > 0 && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "scroll",
                padding: 0,
              }}
            >
              {drugs.map((d) => (
                <li
                  key={d._id}
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    padding: "5px",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => handleSelectDrug(d)}
                >
                  {d.name} - ${d.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Adding Quantity Input for each drug only when drug is selected */}
        {drugDetails.map((drug, index) => (
          <div key={index}>
            <div>
              <label>{drug.drugName || "New Drug"}:</label>
              <br />
              <input
                className="me-3"
                type="number"
                name="quantity"
                value={drug.quantity}
                onChange={(e) => handleDrugChange(index, e)}
                required
                placeholder="Enter quantity"
              />
              <button
                type="button"
                onClick={() => handleRemoveDrug(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 14px 6px",
                  borderRadius: "4px",
                  fontSize: "17px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "10px 20px 10px",
            marginTop: "10px",
            borderRadius: "4px",
            fontSize: "17px",
          }}
        >
          Add Prescription Draft
        </button>
        <div>
          {/* Display the prescription preview */}
          {prescriptionDrafts.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3>Prescription Preview</h3>
              <table className="table table-bordered shadow-sm  mt-3 w-50">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Drug Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionDrafts.map((prescription, pIndex) =>
                    prescription.drugDetails.map((drug, dIndex) => (
                      <tr key={`${pIndex}-${dIndex}`}>
                        <td>{prescription.patientName}</td>
                        <td>{drug.drugName || "Unknown Drug"}</td>
                        <td>{drug.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </form>

      <button
        onClick={handleSubmitAllPrescriptions}
        style={{
          backgroundColor: "#0da912",
          color: "white",
          border: "none",
          padding: "10px 20px 10px",
          marginTop: "10px",
          borderRadius: "4px",
          fontSize: "17px",
        }}
      >
        Submit All Prescriptions
      </button>

      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default AddPrescription;
