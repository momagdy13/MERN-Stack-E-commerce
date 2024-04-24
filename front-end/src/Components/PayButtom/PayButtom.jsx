import { Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import styled from "styled-components";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Alert = ({ open, onClose, message }) => {
  return (
    <Snackbar
      error
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={
        <IconButton size="large" color="white" onClick={onClose}>
          <CloseIcon fontSize="40px" />
        </IconButton>
      }
    />
  );
};


const PayButtom = ({ cartItem }) => {
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
  const url = "http://localhost:4000";
  const { all_product } = useContext(ShopContext);
  const [item, setItem] = useState({});

  const handleCheckout = async () => {
    all_product.map(async (item) => {
      if (cartItem[item.id] > 0) {
        const items = await all_product.filter((item) => cartItem[item.id] > 0);
        const itemsWithQuant = await items.map((item) => ({
          ...item,
          quant: cartItem[item.id],
        }));
        setTimeout(() => {
          setItem(itemsWithQuant);
        }, 3000);
      }
    });
    await axios
      .post(
        `${url}/create-checkout-session`,
        { items: item },
        {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => {
        handleShowAlert(err.response.data.errors);
      });
  };

  const Button = styled.button`
    background: linear-gradient(45deg, #ffffff, #000000);
    border: none;
    color: white;
    padding: 20px 40px;
    font-size: 1.5em;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 50px;
    transition: all 0.3s ease;
    margin-top: 20px;
    margin-bottom: 100px;

    &:before {
      content: "${({ children }) => children}";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px 0 20px;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      transform: translateY(100%);
      transition: all 0.3s ease;
    }

    &:hover:before {
      transform: translateY(0);
    }

    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
  `;
  return (
    <>
      <Button
        onClick={() => {
          handleCheckout();
        }}
      >
        Check Out
      </Button>
      <Alert open={open} onClose={handleClose} message={message} />
    </>
  );
};

export default PayButtom;
