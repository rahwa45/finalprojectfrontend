import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";

const UpdateDrug = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found.");
      navigate("/login");
      return;
    }
    axios
      .get(`https://finalproject-backend-zagu.onrender.com/api/drugs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData({
          name: res.data.name,
          quantity: res.data.quantity,
          price: res.data.price,
        });
        setLoading(false);
      })
      .catch((error) => {
        alert("An error happened. Please check the console.");
        console.log(error);
      });
  }, [id, navigate]);

  const handleEditDrug = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found.");
      navigate("/drugs");
      return;
    }
    const updatedDrug = {
      name: formData.name,
      quantity: formData.quantity,
      price: formData.price,
    };
    axios
      .put(
        `https://finalproject-backend-zagu.onrender.com/api/drugs/${id}`,
        updatedDrug,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Drug updated successffully.");
        navigate("/drugs");
      })
      .catch((error) => {
        alert("An error occured. please check the console");
        console.log(error);
      });
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
    <div className="d-flex justify-content-center flex-column p-5">
      <BackButton />
      <h1>Update Drug</h1>

      <form onSubmit={handleEditDrug} className="">
        <div>
          <label>name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>quantity</label>
          <br />
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>
        <div>
          <label>price</label>
          <br />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <button
          onSubmit={handleEditDrug}
          style={{
            backgroundColor: "purple",
            color: "white",
            fontSize: "20px",
            padding: "8px",
            width: "18rem",
          }}
        >
          Update
        </button>
      </form>
      <div className="foot2 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default UpdateDrug;
