import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
const ProductDetails = ({ clickedProduct }) => {
  const { addToCart, cartItems, addToFav, favItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[clickedProduct.id];
  const FavItem = favItems[clickedProduct.id];
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "none",
        }}
      >
        <img width={360} src={clickedProduct.image} alt="" />
      </Box>

      <Box
        sx={{
          py: 2,
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
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
            background: `black`,
            color: "ghostwhite",
            ":hover": { background: `#194d19` },
          }}
          variant="contained"
          onClick={() => {
            addToCart(clickedProduct.id);
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
              background: `black`,
              color: "ghostwhite",
              ":hover": { background: `#194d19` },
            }}
            variant="contained"
          >
            <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
            Go to Cart
          </Button>
        </Link>

        <Button
          sx={{
            mb: { sm: 0, marginTop: "16px" },
            textTransform: "capitalize",
            marginLeft: "20px",
            marginRight: "30px",
            background: `black`,
            color: "ghostwhite",
            ":hover": { color: ` #b30000`, background: "white" },
            ":active": { color: ` #b30000` },
            ":focus": { color: "red" },
          }}
          variant="contained"
          onClick={() => {
            addToFav(clickedProduct.id);
          }}
        >
          
          Add to Fav {FavItem > 0 && <>{<FavoriteIcon sx={{color:'red', ml:'7px'}}/>}</>}
        </Button>
        <Link to={"/fav"}>
          <Button
            sx={{
              mb: { xs: 1, sm: 0, marginTop: "16px" },
              textTransform: "capitalize",
              background: `black`,
              color: "ghostwhite",
              ":hover": { background: `#194d19` },
            }}
            variant="contained"
          >
            <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
            Go to fav
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ProductDetails;
