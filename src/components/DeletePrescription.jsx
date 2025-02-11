import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeletePrescription = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the prescription ID from the URL

  // Handle delete prescription
  const handleDeletePrescription = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found.");
      navigate("/");
      return;
    }

    // Confirmation dialog

    // Send DELETE request to the backend
    const url = `https://finalproject-backend-eta.vercel.app/api/prescriptions/${id}`;
    console.log(url);
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("prescription deleted successffully");
        navigate("/prescriptions"); // Redirect to the prescriptions list
      })
      .catch((error) => {
        console.log(
          "Error: ",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div>
      <div>
        <h1>are you sure you want to delete this drug</h1>
      </div>
      <button
        onClick={handleDeletePrescription}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeletePrescription;
