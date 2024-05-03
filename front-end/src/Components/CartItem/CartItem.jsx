import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import cross_icon from "../Assest/cross_icon.png";
import { ShopContext } from "../../Contexs/ShopContext";
import axios from "axios";
import PayButtom from "../PayButtom/PayButtom";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50%",
  height: "610px",
  borderRadius: "70px",
  backdropFilter: "blur(10px)",
  backgroudColor: "transparent",
  color: "ghostwhite",
};

export default function CartItem() {
  const { cartItems, all_product, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  const theme = useTheme();

  return (
    <Container sx={{ mt: "4%" }}>
      <Divider sx={{ borderColor: `${theme.palette.text.primary}` }} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Products</Typography>
        <Typography variant="h6">Title</Typography>
        <Typography variant="h6">Price</Typography>
        <Typography variant="h6">Quantity</Typography>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">Remove</Typography>
      </Stack>
      <Divider
        sx={{ borderColor: `${theme.palette.text.primary}`, mb: "10px" }}
      />

      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <img src={item.image} alt="" height={"80px"} width={"80px"} />
              <Typography variant="h8" width={"10px"}>
                {item.descripe}
              </Typography>
              <Typography variant="h6">${item.price}</Typography>
              <Typography
                variant="h6"
                width={"64px"}
                height={"40px"}
                border={"2px solid #ebebeb"}
                borderRadius={"9px"}
                textAlign={"center"}
              >
                {cartItems[item.id]}
              </Typography>
              <Typography variant="h6">
                ${item.price * cartItems[item.id]}
              </Typography>
              <Box
                sx={{ mr: "30px", mt: "10px", cursor: "pointer" }}
                onClick={() => {
                  removeFromCart(item.id);
                }}
              >
                <img
                  src={cross_icon}
                  onClick={() => {}}
                  alt=""
                  width={"20px"}
                  height={"25px"}
                />
              </Box>{" "}
            </Stack>
          );
        }
      })}

      <Divider
        sx={{ borderColor: `${theme.palette.text.primary}`, mt: "20px" }}
      />
      <Container sx={{ display: "flex", mt: "80px", mb: "40px" }}>
        <Stack sx={{ width: "45%" }}>
          <Typography variant="h5">cart Totals</Typography>
          <Stack direction={"row"} justifyContent={"space-between"} mt={"30px"}>
            <Typography variant="h5">SubTotal</Typography>
            <Typography variant="h5">${getTotalCartAmount()}</Typography>
          </Stack>
          <Divider sx={{ borderColor: `${theme.palette.text.primary}` }} />
          <Stack direction={"row"} justifyContent={"space-between"} mt={"30px"}>
            <Typography variant="h5">Shipping Fee</Typography>
            <Typography variant="h5">Free</Typography>
          </Stack>
          <Divider sx={{ borderColor: `${theme.palette.text.primary}` }} />
          <Stack direction={"row"} justifyContent={"space-between"} mt={"30px"}>
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5">${getTotalCartAmount()}</Typography>
          </Stack>

          <Divider sx={{ borderColor: `${theme.palette.text.primary}` }} />

          <PayButtom cartItem={cartItems} />
        </Stack>

        <Stack
          sx={{
            ml: "100px",
            width: "504px",
          }}
        >
          <Typography variant="h6">
            IF you have a promo code, Enter here
          </Typography>
          <Stack mt={"5%"}>
            <TextField
              id="outlined-password-input"
              label="Promo code"
              type="text"
              autoComplete="current-password"
            />{" "}
            <Button
              variant="outlined"
              sx={{
                width: "50%",
                mt: "20px",
                height: "50px",
                color: theme.palette.text.secondary,
                border: `3px solid ${theme.palette.text.secondary}`,
                height: "55px",
                borderRadius: "20px",
                fontSize: "18px",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}
