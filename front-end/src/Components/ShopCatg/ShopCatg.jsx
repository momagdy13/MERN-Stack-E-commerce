import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Rating,
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
import { motion } from "framer-motion";

export default function ShopCatg() {
  const [all_product, setAllProduct] = useState([]);
  const [alignment, setAlignment] = useState(null);
  const [clickedProduct, setclickedProduct] = useState({});
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("allproduct");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAlignment = (event, value) => {
    if (value != null) {
      setAlignment(value);
      setCategory(value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/${category}`)
      .then((response) => {
        setAllProduct(response.data);
        console.log(all_product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alignment]);
  const theme = useTheme();

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
              value="Women"
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
        <Grid
          container
          component={motion.section}
          layout="true"
          initial={{ transform: "scale(0)" }}
          animate={{ transform: "scale(1)" }}
          transition={{ duration: 0.6 }}
        >
          {all_product.map((item) => {
            return (
              <Grid
                container
                item
                key={item.id}
                spacing={-1}
                md={4}
              >
                <Card
                  variant="outlined"
                  sx={{
                   width:'350px',
                    my: 6,
                    ":hover .MuiCardMedia-root ": {
                      transition: "2s",
                      scale: "1.1",
                    },
                    borderRadius: "10px",
                    boxShadow: "rgb(38, 57, 77) 0px 10px 20px -10px;",
                  }}
                >
                  <CardMedia sx={{ height: 300 }} image={item.image} />

                  <Box sx={{ p: 3 }}>
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

                          color: theme.palette.text.secondary,
                          textTransform: "capitalize",
                          background: "#cca300",
                        }}
                        onClick={() => {
                          handleClickOpen();
                          setclickedProduct(item);
                        }}
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
            zIndex: "1000",
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
