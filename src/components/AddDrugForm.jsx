import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import BackLinkkk from "./BackLinkkk";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";

const AddDrugForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [drugs, setDrugs] = useState([]); // Store multiple drugs
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddDrug = () => {
    const token = localStorage.getItem("token");
    if (!name || !quantity || !price) {
      enqueueSnackbar("Please fill in all fields", {
        variant: "error",
      });
      return;
    }

    const data = {
      name,
      quantity,
      price,
    };
    axios
      .post("https://finalproject-backend-zagu.onrender.com/api/drugs", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Drug created successfully", { variant: "success" });
        navigate("/drugs");
      })
      .catch((error) => {
        console.log("Error creating drug", { variant: "error" });
      });
  };

  return (
    <div className="d-flex flex-column p-5 adddrug">
      <BackLinkkk />
      <h1 className="mb-4">Add Drugs</h1>

      <div className="mb-3 w-50">
        <label>Drug Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3 w-50">
        <label>Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="mb-3 w-50">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button
        onClick={handleAddDrug}
        style={{
          backgroundColor: "#0da912",
          color: "white",
          border: "none",
          padding: "10px 20px 10px",
          marginTop: "10px",
          borderRadius: "4px",
          fontSize: "17px",
          width: "8rem",
        }}
      >
        Save
      </button>

      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default AddDrugForm;
