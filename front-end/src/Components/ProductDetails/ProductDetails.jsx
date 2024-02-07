import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, ToggleButton, Typography } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import { Link } from "react-router-dom";

const ProductDetails = ({ clickedProduct }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[clickedProduct.id]

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img width={360} src={clickedProduct.image} alt="" />
      </Box>

      <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5">{clickedProduct.name}</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          ${clickedProduct.price}
        </Typography>
        <Typography variant="body1">{clickedProduct.descripe}</Typography>

        <Stack
          sx={{ justifyContent: { xs: "center", sm: "left" } }}
          direction={"row"}
          gap={1}
          my={2}
        >
          <ToggleButtonGroup
            value={clickedProduct.image}
            exclusive
            sx={{
              ".Mui-selected": {
                border: "1px solid royalblue !important",
                borderRadius: "5px !important",
                opacity: "1",
                backgroundColor: "initial",
              },
            }}
          >
            <ToggleButton
              key={clickedProduct.id}
              sx={{
                width: "110px",
                height: "110px",
                mx: 1,
                p: "0",
                opacity: "0.5",
              }}
            >
              <img
                style={{ borderRadius: 3, m: 4 }}
                height={"100%"}
                width={"100%"}
                src={clickedProduct.image}
                alt=""
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Button
          sx={{
            mb: { xs: 1, sm: 0, margin: " 16px" },
            textTransform: "capitalize",
          }}
          variant="contained"
          onClick={() => {
            addToCart(clickedProduct.id, clickedProduct._id);
          }}
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Add to cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </Button>
        <Link to={"/cart"}>
          <Button
            sx={{
              mb: { xs: 1, sm: 0, marginTop: "16px" },
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
            Go to Cart
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ProductDetails;
