import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";

const DeleteDrug = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("drug id", id);
  const handleDeleteDrugs = () => {
    navigate("/dashboard");
  };

  const handleDeleteDrug = () => {
    const token = localStorage.getItem("token");
    console.log("Authorization token: ", token);

    if (!token) {
      alert("No token found. Please log in.");
      navigate("/");
      return;
    }

    setLoading(true);
    const url = `https://finalproject-backend-zagu.onrender.com/api/drugs/${id}`;
    console.log(url);
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/drugs");
      })
      .catch((error) => {
        console.log(
          "Error: ",
          error.response ? error.response.data : error.message
        );
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
    <div className="display-flex justify-content-center p-5">
      <div>
        <BackButton />
        <h1>are you sure you want to delete this drug</h1>
      </div>
      <button
        onClick={handleDeleteDrug}
        style={{
          padding: "10px 40px",
          backgroundColor: "red",
          margin: "8px",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
      <button onClick={handleDeleteDrugs} style={{ padding: "8px 30px" }}>
        Cancel
      </button>
      <div className="foot3 d-flex align-items-end">
        <Footer />
      </div>
    </div>
  );
};

export default DeleteDrug;
