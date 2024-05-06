import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ShopContext } from "../Contexs/ShopContext";
import axios from "axios";
import { Button } from "@mui/material";
export default function CheckoutSuccess() {
  const { removeAllFromCart } = useContext(ShopContext);
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";

  const addToDone = () => {
    axios
      .post(
        `${url}/cart/addtodone`,
        {},
        {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success == 1) {
          window.location.href = "https://moshop24.netlify.app/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7d794; /* Pastel yellow */
  `;

  const Card = styled(motion.div)`
    background-color: #f3a683; /* Pastel orange */
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  `;

  const Emoji = styled.span`
    font-size: 3rem;
  `;
  return (
    <Container>
      <Card
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Emoji role="img" aria-label="party emoji">
          🎉
        </Emoji>
        <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>
          Payment Successful!
        </h1>
        <p
          style={{ color: "#2c3e50", fontSize: "1.2rem", marginBottom: "40px" }}
        >
          Thank you for your purchase. Enjoy your day!
        </p>
        <Button
          style={{
            color: "#2c3e50",
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
          onClick={() => {
            removeAllFromCart();
            addToDone();
          }}
        >
          Go back to home
        </Button>
      </Card>
    </Container>
  );
}
