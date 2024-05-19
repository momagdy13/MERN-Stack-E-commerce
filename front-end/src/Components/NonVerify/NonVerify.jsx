import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";

const EmailVerificationTemplate = () => {
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";

  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendError(null);

    try {
      await axios.post(`${url}/auth/resent`, { email }).then((res) => {
        if (res.data.success) {
          setResendSuccess(true);
          setTimeout(() => {
            window.location.href = "https://moshop24.netlify.app";
          }, 2000);
        } else {
          setResendError(res.data);
        }
      });
    } catch (error) {
      setResendError("Failed to resend verification email.");
    }

    setIsResending(false);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: 20,
        backgroundColor: theme.palette.mode === "dark" ? "#333" : "#ffffff",
        borderRadius: 10,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ color: `${theme.palette.primary.main}` }}>
        Your email isn't verified yet
      </Typography>
      <Typography variant="body1">
        Please check your email inbox for the verification email. If you haven't
        received it, make sure to check your spam folder.
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResendVerification();
        }}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleChange}
          style={{ marginTop: 20 }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor:
              theme.palette.mode === "dark" ? "#2196f3" : "#007bff",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: 5,
            marginTop: 20,
          }}
          disabled={isResending}
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </Button>
        {resendError && (
          <Typography style={{ color: "red", marginTop: 10 }}>
            {resendError}
          </Typography>
        )}
        {resendSuccess && (
          <Typography style={{ color: "green", marginTop: 10 }}>
            Verification email resent successfully.
          </Typography>
        )}
      </form>
    </div>
  );
};

export default EmailVerificationTemplate;
