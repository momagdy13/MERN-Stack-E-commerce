import { Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { ShopContext } from "../Contexs/ShopContext";

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [done, setDone] = useState(Number);
  const { getTotalCartItems } = useContext(ShopContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(
          "http://localhost:4000/cart/getaccount",
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

    axios
      .post(
        "http://localhost:4000/cart/getdone",
        {},
        {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setDone(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      <Typography variant="h4" mb={"10px"}>
        User_Name
      </Typography>
      <Typography variant="h5" color={"gray"}>
        {userData.username}
      </Typography>
      <Typography variant="h4" mt={"20px"} mb={"15px"}>
        Email
      </Typography>
      <Typography variant="h5" color={"gray"}>
        {userData.email}
      </Typography>
      <Divider sx={{ mt: "20px" }} />
      <Typography variant="h4" mt={"20px"} mb={"15px"} textAlign={"center"}>
        Orders
      </Typography>
      <Typography variant="h4" mt={"20px"} mb={"15px"}>
        Waiting Orders : {getTotalCartItems()}
      </Typography>
      <Typography variant="h4" mt={"20px"} mb={"15px"}>
        Done Orders : {done}
      </Typography>
    </Container>
  );
}
