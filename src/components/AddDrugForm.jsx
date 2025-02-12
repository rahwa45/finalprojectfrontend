import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";

const AddDrugForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleDrug = () => {
    const token = localStorage.getItem("token");
    if (!name || quantity || price) {
      enqueueSnackbar("Please fill in all fields.", {
        variant: "error",
      });
    }
    const data = {
      name,
      quantity,
      price,
    };
    setLoading(true);
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
        console.log("Error creating drug:", error);
        enqueueSnackbar("An error occured", { variant: "error" });
      });
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
        {/* Show the spinner when loading */}
        <ClipLoader size={50} color={"#3498db"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="d-flex justify-between flex-column p-5">
      <BackButton />
      <h1>Add Drug</h1>
      <div>
        <label>Drugname</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Drugquantity</label>
        <br />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Drugprice</label>
        <br />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button
        onClick={handleDrug}
        className="btn"
        style={{
          backgroundColor: "purple",
          color: "white",
          fontSize: "20px",
          padding: "8px",
          width: "18rem",
        }}
      >
        Add
      </button>
      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default AddDrugForm;
