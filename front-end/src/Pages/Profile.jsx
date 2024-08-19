import { Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { Box } from "@mui/system";

export default function Profile() {
  const [userData, setUserData] = useState("");
  const url = "https://mern-stack-e-commerce-50uh.onrender.com"; 

  const handleChange = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    setUserData({
      ...userData,
      [evt.target.name]: value,
    });
  };

  console.log(userData);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(
          `${url}/auth/getaccount`,
          {},
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const updateUserData = async (userData) => {
    try {
      const response = await axios.put(`${url}/auth/update`, userData, {
        headers: { "auth-token": `${localStorage.getItem("token")}` },
      });

      // Handle successful response
      console.log("User updated successfully:", response.data);
      // Update the UI or state if needed
    } catch (error) {
      // Handle error response
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
      // Optionally, display an error message to the user
    }
  };

  return (
    <Container sx={{ mb: "107px" }}>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontFamily={"Italianno"}
        mt={"40px"}
        fontWeight={600}
      >
        My Account
      </Typography>
      <div className="profile">
        <Typography variant="h4" mb={"10px"}>
          User_Name
        </Typography>
        <Typography variant="h4" mt={"20px"} mb={"15px"}>
          Email
        </Typography>
        <input
          type="text"
          style={{ width: "400px" }}
          onChange={handleChange}
          name="username"
          defaultValue={userData.username}
        />

        <input
          type="text"
          style={{ width: "400px" }}
          onChange={handleChange}
          name="email"
          readOnly
          disabled
          value={userData.email}
        />
        <Typography variant="h4" mt={"20px"} mb={"15px"}>
          new Password
        </Typography>
        <Box flexGrow={1} />

        <input
          type="password"
          style={{ width: "400px" }}
          onChange={handleChange}
          name="password"
          defaultValue={userData.password}
        />

        <button
          onClick={() => {
            updateUserData(userData);
          }}
        >
          Update
        </button>
      </div>
    </Container>
  );
}
