import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false); // Track loading state
  const [verified, setVerified] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Extract the query parameter 'token' from the URL
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  const verifyEmail = async () => {
    setLoading(true); // Set loading to true when we start verifying the email
    try {
      const response = await axios.get(
        `https://finalproject-backend-zagu.onrender.com/api/auth/verify?token=${token}`
      );

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        setVerified(true); // Set verified to true on success
        navigate("/login"); // Redirect to login after successful verification
      } else {
        enqueueSnackbar("Verification failed. Please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Invalid or expired token", { variant: "error" });
      console.error("Verification error:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // UseEffect to show the button after clicking the email link
  useEffect(() => {
    if (token) {
      setShowButton(true); // Show the button after clicking the link
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>

      {!verified ? (
        <>
          {showButton ? (
            <>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* Show the spinner when loading */}
                  <ClipLoader size={50} color={"#3498db"} loading={loading} />
                </div>
              ) : (
                <>
                  <p>Click the button below to verify your email:</p>
                  <button
                    onClick={verifyEmail}
                    className="btn btn-success btn-lg"
                  >
                    Verify Email
                  </button>
                </>
              )}
            </>
          ) : (
            <p>Your email has been successfully verified!</p>
          )}
        </>
      ) : (
        <p>Your email has been successfully verified!</p>
      )}
    </div>
  );
};

export default VerifyEmail;
