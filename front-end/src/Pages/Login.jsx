import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import sign from "../Components/Assest/sign-up-black.png";

export default function SignUpLogin() {
  const [open, setOpen] = React.useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alert, setAlert] = useState("");
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
  const login = async () => {
    await axios
      .post("http://localhost:4000/login", formData)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          window.location.replace("/");
          localStorage.setItem("token", response.data.token);
        } else {
          setAlertContent(response.data.errors);
          setAlert(response.data.errors);
          setOpen(true);
        }
      })
      .catch((response) => {
        console.log(response);
        setAlertContent(response.data.response.data);
        setOpen(true);
      });
  };
  const signup = async () => {
    await axios
      .post("http://localhost:4000/signup", formData)
      .then((response) => {
        if (response.data.success) {
          window.location.replace("/");
          localStorage.setItem("token", response.data.token);
        } else {
          setAlertContent(response.data);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const colse = () => {
    setTimeout(() => {});
  };
  console.log(alert);

  return (
    <Container>
      <Stack
        sx={{
          mt: "100px",
          width: "70%",
          ml: "15%",
          height: "790px",
          boxShadow: ` 0px 14px 28px ${theme.palette.text.secondary},  0px 10px 10px  ${theme.palette.text.secondary}`,
        }}
        border={`4px solid ${theme.palette.text.secondary}`}
        borderRadius={"50px"}
      >
        <Typography variant="h4" sx={{ marginLeft: "43%", mt: "80px" }}>
          {state}{" "}
        </Typography>

        {alertContent.username ? (
          <Box sx={{ ml: "25%", width: "400px", mt: "3%" }}>
            <Alert severity="error">{alertContent.username.message}</Alert>
          </Box>
        ) : (
          <></>
        )}
        <Stack width={"50%"} marginLeft={"25%"}>
          {state === "Signup" ? (
            <TextField
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
          {alertContent.email ? (
            <Box sx={{ width: "400px", mt: "10%" }}>
              <Alert severity="error">{alertContent.email.message}</Alert>
            </Box>
          ) : (
            <Collapse in={open}>
              <Box sx={{ width: "400px", mt: "10%" }}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  {alert}
                </Alert>
              </Box>
            </Collapse>
          )}
          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandle}
            placeholder="Your Email"
            sx={{
              height: "50px",
              fontSize: "14px",
              mt: "30px",
              borderRadius: "20px",
            }}
          />
          {alertContent.password ? (
            <Box sx={{ width: "400px", mt: "5%" }}>
              <Alert severity="error">{alertContent.password.message}</Alert>
            </Box>
          ) : (
            <></>
          )}
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandle}
            placeholder="Your Password"
            sx={{
              height: "50px",
              fontSize: "14px",
              mt: "30px",
              borderRadius: "10px",
            }}
          />
          <Button
            variant="outlined"
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
              <Typography>
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
              <Typography>
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

          <Box display={"flex"} marginTop={"30px"} marginBottom={"50px"}>
            <Checkbox type="checkbox" name="" id="" />
            <Typography component={"p"}>
              By continuem i agree the terms of use & privacy policy.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
