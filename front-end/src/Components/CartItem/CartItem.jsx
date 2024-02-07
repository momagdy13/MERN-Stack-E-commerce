import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import hero_ from "../Assest/apple-black-glowing-logo.jpg";
import cross_icon from "../Assest/cross_icon.png";
import { ShopContext } from "../../Contexs/ShopContext";

export default function CartItem() {
  const { cartItems, all_product, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ mt: "40px" }}
      >
        <Typography variant="h6">Products</Typography>
        <Typography variant="h6">Title</Typography>
        <Typography variant="h6">Price</Typography>
        <Typography variant="h6">Quantity</Typography>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">Remove</Typography>
      </Stack>
      <hr />

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

      <hr />
      <Container sx={{ display: "flex", mt: "80px", mb: "40px" }}>
        <Stack sx={{ width: "45%" }}>
          <Typography variant="h5">cart Totals</Typography>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <h3>SubTotal</h3>
            <h3>${getTotalCartAmount()}</h3>
          </Stack>
          <Divider />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <p>Shipping Fee</p>
            <p>Free</p>
          </Stack>
          <Divider />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <h3>Total</h3>
            <h3>${getTotalCartAmount()}</h3>
          </Stack>
          <Divider />

          <Button
            variant="outlined"
            color="error"
            sx={{ width: "50%", mt: "20px" }}
          >
            PROCEED TO CHECKOUT
          </Button>
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
          <Stack>
            <TextField
              error
              id="outlined-password-input"
              label="Promo code"
              type="text"
              autoComplete="current-password"
            />{" "}
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "50%", mt: "20px", ml: "110px", height: "50px" }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}
