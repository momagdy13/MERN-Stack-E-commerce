import React, { useState } from "react";
import "../css.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Checkbox,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Box, useTheme } from "@mui/system";

function LoginForm() {
  const theme = useTheme();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleShowAlert = (message) => {
    setMessage(message);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 8000);
  };
  const login = async () => {
    try {
      await axios.post("http://localhost:4000/login", formData).then((res) => {
        if (res.data.success) {
          window.location.replace("/");
          localStorage.setItem("token", res.data.token);
        }
      });
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
      handleShowAlert(e.response.data.message);
    }
  };
  const signup = async () => {
    await axios
      .post("http://localhost:4000/signup", formData)
      .then((response) => {
        if (response.data.success) {
          window.location.replace("/");
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((e) => {
        console.log(e);
        handleShowAlert(e.response.data.message);
      });
  };

  return (
    <section className="sec">
      {" "}
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div className="square" style={{ "--i": 0 }}></div>
        <div className="square" style={{ "--i": 1 }}></div>
        <div className="square" style={{ "--i": 2 }}></div>
        <div className="square" style={{ "--i": 3 }}></div>
        <div className="square" style={{ "--i": 4 }}></div>
        <div className="square" style={{ "--i": 5 }}></div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
          action={
            <IconButton size="large" color="white" onClick={handleClose}>
              <CloseIcon fontSize="40px" />
            </IconButton>
          }
        />
        <div className="container">
          <div className="form">
            <Typography variant="h4" sx={{ color: "ghostwhite" }}>
              {state}
            </Typography>
            <form>
              {state === "Signup" ? (
                <Stack className="inputBox">
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder":
                        {
                          color: "black",
                        },
                    }}
                    type="text"
                    required
                    value={formData.username}
                    onChange={changeHandle}
                    placeholder="User Name"
                    name="username"
                  />
                </Stack>
              ) : (
                <></>
              )}

              <Stack className="inputBox">
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder":
                      {
                        color: "black",
                      },
                  }}
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={changeHandle}
                  placeholder="Email"
                />
              </Stack>
              <Stack className="inputBox">
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder":
                      {
                        color: "black",
                      },
                  }}
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={changeHandle}
                  placeholder="Password"
                />
              </Stack>
              {state === "Signup" ? (
                <Button
                  sx={{
                    mt: "20px",
                    ml: "10%",
                    width: "70%",
                    height: "50px",
                    color: `black`,
                    fontSize: "20px",
                    border: "1px solid #fff",
                    borderRadius: "20px",
                    mb: "10px",
                  }}
                  onClick={() => {
                    signup();
                  }}
                >
                  Create Account
                </Button>
              ) : (
                <Button
                  sx={{
                    mt: "20px",
                    ml: "10%",
                    width: "70%",
                    height: "50px",
                    color: `black`,
                    fontSize: "20px",
                    border: "1px solid #fff",
                    borderRadius: "20px",
                    mb: "10px",
                  }}
                  value="Login"
                  onClick={() => {
                    login();
                  }}
                >
                  Log In
                </Button>
              )}
              {state === "Signup" ? (
                <Typography className="forget" sx={{ color: "ghostwhite" }}>
                  Already have an account ?{" "}
                  <Typography
                    sx={{ cursor: "pointer", ":hover": { color: "red" } }}
                    onClick={() => {
                      setState("Login");
                    }}
                  >
                    Login
                  </Typography>
                </Typography>
              ) : (
                <Typography sx={{ color: "ghostwhite" }}>
                  Don't have an account?
                  <Typography
                    sx={{ cursor: "pointer", ":hover": { color: "red" } }}
                    onClick={() => {
                      setState("Signup");
                    }}
                  >
                    Login here
                  </Typography>
                </Typography>
              )}

              <Box display={"flex"} marginTop={"50px"} marginBottom={"50px"}>
                <Checkbox type="checkbox" />
                <Typography
                  component={"p"}
                  sx={{ mt: "10px", color: "ghostwhite" }}
                >
                  By continuem i agree the terms of use & privacy policy.
                </Typography>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
