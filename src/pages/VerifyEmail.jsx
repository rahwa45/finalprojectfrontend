import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  // Extract the query parameter 'token' from the URL
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  // Define the verifyEmail function
  const verifyEmail = async () => {
    setLoading(true);
    try {
      // Send the token to the backend for verification
      const response = await axios.get(
        `https://finalproject-backend-zagu.onrender.com/api/auth/verify?token=${token}`
      );
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        setVerified(true);
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

  // UseEffect to automatically trigger email verification when token is found
  useEffect(() => {
    if (token) {
      verifyEmail(); // Call verifyEmail only if token is defined
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>

      {!verified ? (
        <>
          {loading ? (
            <p>Verifying your email, please wait...</p>
          ) : (
            <>
              <p>Click the button below to verify your email:</p>
              <button
                onClick={verifyEmail}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Verify Email
              </button>
            </>
          )}
        </>
      ) : (
        <p>Your email has been successfully verified!</p>
      )}
    </div>
  );
};

export default VerifyEmail;
