import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import React from "react";
import Footer from "../components/Footer";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handelKeyPress = (event) => {
    if (event.key == "Enter") {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    if (!username || !role || !email || !password) {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      return;
    }
    setLoading(true);
    axios
      .post("https://finalproject-backend-zagu.onrender.com/api/auth/signup", {
        username,
        role,
        email,
        password,
      })

      .then(() => {
        enqueueSnackbar(
          "Sign Up successfully! Please check your email to verify your account.",
          { variant: "success" }
        );
        navigate("/login");
      })

      .catch((error) => {
        const { status, data } = error.response || {};
        if (status === 400 && data.message === "User already exists") {
          enqueueSnackbar("This username or email is already registered.", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Sign Up failed. Please try again later.", {
            variant: "error",
          });
          setLoading(false);
        }
        console.error("Error details:", error.response);
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
    <div className="form-container">
      <div className="d-flex flex-column register">
        <h1>Sign Up</h1>
        <div className="">
          <div>
            <label className="">Username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <label className="">Role</label>
            <br />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className=""
            />
          </div>
          <div className="">
            <label className="">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=""
            />
          </div>
          <div className="">
            <label className="">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""
              onKeyPress={handelKeyPress}
            />
          </div>
          <button
            className="btn"
            style={{ width: 300, backgroundColor: "#057f09", color: "white" }}
            onClick={handleSignUp}
          >
            Create my account
          </button>
          <br /> <br />
          <div>
            <p className="">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
