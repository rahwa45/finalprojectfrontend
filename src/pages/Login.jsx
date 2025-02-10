import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      enqueueSnackbar("Please fill out all fields", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5559/api/auth/login", {
        username,
        password,
      });

      const { token, username: resUsername, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", resUsername);

      enqueueSnackbar("Login successful!", { variant: "success" });

      if (role === "Pharmacist") {
        navigate("/dashboard");
      } else if (role === "Cashier") {
        navigate("/cashier");
      } else {
        enqueueSnackbar("Unknown role. Please contact support.", {
          variant: "warning",
        });
      }
    } catch (error) {
      // Fixed syntax error here
      console.log("Error Response:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        enqueueSnackbar(error.response.data.message, {
          variant: "warning",
        });
      } else if (error.response?.status === 401) {
        enqueueSnackbar("Invalid credentials. Please try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred. Please try again later.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="d-flex flex-column register2 align-items-center">
        <h1 className="">Login</h1>
        <div className="d-flex flex-column">
          <div className="">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=""
              placeholder="Username"
            />
          </div>

          <div className="">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""
              placeholder="password"
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className="btn"
            style={{ width: 300, backgroundColor: "#057f09", color: "white" }}
            onClick={handleLogin}
          >
            Continue
          </button>
          <div>
            <p className="mt-5">
              {" "}
              Don't have an account?
              <br /> <br />
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
