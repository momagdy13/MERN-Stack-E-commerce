import React, { useContext,useState } from "react";
import {
  Alert,
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
import Modal from "@mui/material/Modal";
import axios from 'axios'
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
  const {
    cartItems,
    all_product,
    removeFromCart,
    removeAllFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCollapse, setOpenCol] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const doneOrder = () => {
    axios
      .post(
        "http://localhost:4000/addtodone",
        {},
        {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container sx={{ mt: "8%", mb: "12%" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ ml: "35%", mb: "30px" }}>
            Bill Dateails
          </Typography>
          <Typography variant="h5" sx={{ mb: "20px" }}>
            Sub Total: ${getTotalCartAmount()}
          </Typography>
          <Typography variant="h5" sx={{ mb: "20px" }}>
            {" "}
            Total: ${getTotalCartAmount()}
          </Typography>
          <Typography variant="h5" sx={{ mb: "20px" }}>
            Payment Way : Upon Receipt
          </Typography>
          <Typography variant="h5" sx={{ mb: "20px" }}>
            Your Order will arrive after three days
          </Typography>
          <Box sx={{ display: "flex", mt: "100px", ml: "280px" }}>
            {getTotalCartAmount() > 0 && (
              <Button
                variant="outlined"
                sx={{
                  width: "280px",
                  mr: "50px",
                  color: "ghostwhite",
                  border: `3px solid ghostwhite`,
                  height: "55px",
                  borderRadius: "20px",
                  fontSize: "20px",
                }}
                onClick={() => {
                  removeAllFromCart(), setOpenCol(true), doneOrder();
                  setInterval(() => {
                    window.location.reload(true);
                  }, 2850);
                }}
              >
                CHECKOUT
              </Button>
            )}
            <Button
              variant="outlined"
              sx={{
                width: "240px",
                fontSize: "20px",
                color: "ghostwhite",
                border: `3px solid ghostwhite`,
                height: "55px",
                borderRadius: "20px",
              }}
              onClick={() => {
                handleClose(), setOpenCol(false), setinterval;
              }}
            >
              Close
            </Button>
          </Box>
          <Collapse in={openCollapse}>
            <Alert
              sx={{
                mt: "30px",
                border: "2px solid green",
                borderRadius: "30px",
              }}
            >
              Done Order
            </Alert>
          </Collapse>
        </Box>
      </Modal>
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

          <Button
            variant="outlined"
            sx={{
              width: "100%",
              mt: "20px",
              color: theme.palette.text.secondary,
              border: `3px solid ${theme.palette.text.secondary}`,
              height: "55px",
              borderRadius: "20px",
              fontSize: "18px",
            }}
            onClick={handleOpen}
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
