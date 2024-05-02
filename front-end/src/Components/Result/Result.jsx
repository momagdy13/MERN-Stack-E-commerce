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
import { useLocation } from "react-router-dom";
import { ShopContext } from "../../Contexs/ShopContext";

export default function Result({ name }) {
  const { all_product } = useContext(ShopContext);
  const productName = useLocation();

  return (
    <>
      <Header2 />
      <Container>
        <Typography variant="h3">Result :</Typography>
        {all_product.map((item) => {
          if (productName.state === item.name) {
            return (
              <Grid container item key={item.id} spacing={2} md={4}>
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
            );
          }
        })}
      </Container>
    </>
  );
}
