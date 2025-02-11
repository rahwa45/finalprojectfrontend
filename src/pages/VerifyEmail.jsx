import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  // Extract the query parameter 'token' from the URL
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        const response = await axios.get(
          `https://finalproject-backend-zagu.onrender.com/api/auth/verify?token=${token}`
        );
        if (response.status === 200) {
          enqueueSnackbar(response.data.message, { variant: "success" });
          navigate("/login");
        } else {
          enqueueSnackbar("Verification failed. Please try again.", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Invalid or expired token", { variant: "error" });
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyEmail(); // Call verifyEmail only if token is defined
  }, [token, enqueueSnackbar, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>

      {loading ? (
        <p>Please wait while we verify your email...</p>
      ) : (
        <p>Email verification complete.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
