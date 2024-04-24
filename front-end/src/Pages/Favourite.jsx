import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { ShopContext } from "../Contexs/ShopContext";
import { Cancel } from "@mui/icons-material";

export default function Favourite() {
  const { favItems, all_product, removeFromFav } = useContext(ShopContext);
  const theme = useTheme();

  return (
    <Stack sx={{ mb: "659px", padding: "60px", width: "100%", height: "100%" }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontFamily: "cursive" }}
      >
        Favourite Page
      </Typography>

      <Box sx={{ flexGrow: 1 }} flexWrap={"wrap"}>
        <Grid
          Stack
          layout="true"
          initial={{ transform: "scale(0)" }}
          animate={{ transform: "scale(1)" }}
          transition={{ duration: 0.6 }}
        >
          {all_product.map((item) => {
            if (favItems[item.id] > 0) {
              return (
                <Grid xs={2} sm={4} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      maxWidth: 350,
                      my: 5,
                      ":hover .MuiCardMedia-root ": {
                        transition: "2s",
                        scale: "1.1",
                      },
                      borderRadius: "20px",
                      boxShadow: "  rgb(38, 57, 77) 0px 10px 10px -10px;",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 350, padding: "30px" }}
                      image={item.image}
                    />

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
                          onClick={() => {
                            removeFromFav(item.id);
                          }}
                        >
                          <Cancel />
                          Remove From Fav
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
            }
          })}
        </Grid>
      </Box>
    </Stack>
  );
}
