import React, { useContext } from "react";
import Header2 from "../Headers/Header";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Contexs/ShopContext";
import productNan from "../Assest/productNan.jpg";

export default function Result() {
  const { all_product } = useContext(ShopContext);
  const productName = useLocation();
  const navigate = useNavigate();
  const productDetails = (item) => {
    navigate("/product-details", { state: item });
  };

  const searchKeyword = productName.state.toLowerCase();

  const filteredProducts = all_product.filter((item) => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(searchKeyword);
  });

  return (
    <>
      <Header2 />
      <Container sx={{ display: "flex" }}>
        <Typography variant="h3">Result :</Typography>
        {filteredProducts.length || null > 0 ? (
          filteredProducts.map((item) => (
            <Grid
              container
              item
              key={item.id}
              spacing={2}
              md={4}
              sx={{ mt: "70px" }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: "350px",
                  my: 6,
                  "&:hover .MuiCardMedia-root": {
                    transition: "2s",
                    transform: "scale(1.1)",
                  },
                  borderRadius: "10px",
                  boxShadow: "rgb(38, 57, 77) 0px 10px 20px -10px",
                }}
              >
                <CardMedia
                  sx={{ height: 300, cursor: "pointer" }}
                  image={item.image}
                  onClick={() => {
                    productDetails(item);
                  }}
                />
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
          ))
        ) : (
          <Grid item sx={{ margin: "auto", width: "100%", mt: "60px" }}>
            <Card
              variant="outlined"
              sx={{
                width: "1000px",
                my: 6,
                borderRadius: "15px",
                boxShadow: "rgb(38, 57, 77) 0px 10px 20px -10px",
              }}
            >
              <CardMedia
                sx={{ height: 400 }}
                image={productNan}
                onClick={() => {
                  productDetails(item);
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h3">لا يوجد منتجات مطابقة.</Typography>
              </Box>
            </Card>
          </Grid>
        )}
      </Container>
    </>
  );
}
