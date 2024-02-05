import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Rating,
  Slide,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { Close } from "@mui/icons-material";
import ProductDetails from "../ProductDetails/ProductDetails";

export default function ShopCategory() {
  const [all_product, setAllProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/allproduct`)
      .then((response) => {
        setAllProduct(response.data);
        console.log(all_product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const theme = useTheme();
  const [alignment, setAlignment] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleAlignment = (event, value) => {
    setAlignment(value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [clickedProduct, setclickedProduct] = useState({});

  return (
    <Container sx={{ mt: 9 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* Text Product */}
        <Stack id="select-product">
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography variant="body1" fontWeight={300}>
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>
        </Stack>
        {/* Text Product */}

        {/* Select Bottom */}
        <Box flexGrow={1} />
        <Stack direction={"row"} id={"toggle"}>
          <ToggleButtonGroup
            color="error"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{ ".Mui-selected": { background: "initial !important" } }}
          >
            <ToggleButton
              value="allproduct"
              aria-label="left aligned"
              sx={{ width: "200px" }}
            >
              All Products
            </ToggleButton>
            <ToggleButton
              sx={{ width: "200px" }}
              value="men"
              aria-label="centered"
            >
              Men Category
            </ToggleButton>
            <ToggleButton
              sx={{ width: "200px" }}
              value="women"
              aria-label="right aligned"
            >
              Women Category
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* Select Bottom */}
      </Stack>

      {/* item */}
      <Box sx={{ flexGrow: 1 }} flexWrap={"wrap"}>
        <Grid container>
          {all_product.map((item) => {
            return (
              <Grid xs={2} sm={4} md={4} key={item}>
                <Card
                  variant="outlined"
                  sx={{
                    maxWidth: 350,
                    my: 5,
                    ":hover .MuiCardMedia-root ": {
                      transition: "2s",
                      scale: "1.1",
                    },
                  }}
                >
                  <CardMedia sx={{ height: 350 }} image={item.image} />

                  <Box sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        ${item.price}
                      </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2">
                      {item.descripe}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <CardActions>
                      <Button
                        sx={{
                          border: "1px  solid black",
                          boxShadow: ".5px .2px 1px .3px #ff1412",
                          color: theme.palette.text.secondary,
                          textTransform: "capitalize",
                        }}
                        onClick={handleClickOpen}
                      >
                        <ShoppingCartIcon />
                        Add To Card
                      </Button>
                      <Rating
                        name="half-rating-read"
                        value={item.rate}
                        precision={0.5}
                        readOnly
                      />
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* Item */}

      {/* Dialog */}

      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          sx={{
            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            position: "absolute",
            top: 0,
            right: 10,
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>

        <ProductDetails clickedProduct={clickedProduct} />
      </Dialog>
      {/* Dialog */}
    </Container>
  );
}
