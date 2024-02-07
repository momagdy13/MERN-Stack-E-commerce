import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function SignUpLogin() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    await axios
      .post("http://localhost:4000/login",formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (response.data.success) {
          window.location.replace("/");
        }
      })
      .catch((response) => {
        console.log(response.message);
        Alert(response.message);
      });
  };
  const signup = async () => {
    await axios
      .post("http://localhost:4000/signup", formData)
      .then((response) => {
        if (response) {
          window.location.replace("/");
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginLeft: "45%", color: "red" }}>
        {state}{" "}
      </Typography>
      <Stack width={"50%"} marginLeft={"25%"}>
        {state === "Signup" ? (
          <Input
            error
            type="text"
            name="username"
            value={formData.username}
            onChange={changeHandle}
            placeholder="Your Name"
            sx={{
              height: "50px",
              fontSize: "14px",
              mt: "30px",
              borderRadius: "10px",
            }}
          />
        ) : (
          <></>
        )}
        <Input
          error
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandle}
          placeholder="Your Email"
          sx={{
            height: "50px",
            fontSize: "14px",
            mt: "40px",
            borderRadius: "20px",
          }}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={changeHandle}
          placeholder="Your Password"
          error
          sx={{
            height: "50px",
            fontSize: "14px",
            mt: "40px",
            borderRadius: "10px",
          }}
        />
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "50%",
            ml: "25%",
            mt: "30px",
            borderRadius: "15px",
            height: "40px",
          }}
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </Button>

        <Stack display={"flex"} marginTop={"40px"}>
          {state === "Login" ? (
            <Typography className="loginsignup">
              Creating an account?{" "}
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "red" } }}
                onClick={() => {
                  setState("Signup");
                }}
              >
                Click here
              </Typography>
            </Typography>
          ) : (
            <Typography className="loginsignup">
              Already have an account?{" "}
              <Typography
                sx={{ cursor: "pointer", ":hover": { color: "red" } }}
                onClick={() => {
                  setState("Login");
                }}
              >
                Login here
              </Typography>
            </Typography>
          )}
        </Stack>

        <Box display={'flex'} marginTop={'30px'} marginBottom={'50px'}>
          <Checkbox type="checkbox" name="" id="" />
          <p>By continuem i agree the terms of use & privacy policy.</p>
        </Box>
      </Stack>
    </Container>
  );
}
