import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import slider from "../Assest/02-lestrange.webp";
import women from "../Assest/OIP.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./Swiper.css";

export default function Hero() {
  const theme = useTheme();
  const mySlider = [
    { text: "MEN", link: slider },
    {
      text: "Women",
      link: women,
    },
  ];

  return (
    <Container sx={{ display: "flex", alignItems: "center", mt: 6, mb: 6 }}>
      <Box id="hero-left" sx={{ overflow: "auto", mr: "20px" }}>
        <Swiper
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {mySlider.map((item, index) => {
            return (
              <SwiperSlide key={index} className="parent-slider">
                <img src={item.link} alt="" />
                <Box
                  sx={{
                    position: "absolute",
                    left: "10%",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                    variant="h5"
                  >
                    LIFESTYLE COLLECTION
                  </Typography>

                  <Typography
                    sx={{
                      color: "#222",
                      fontWeight: 500,
                      my: 1,
                    }}
                    variant="h3"
                  >
                    {item.text}
                  </Typography>

                  <Stack
                    sx={{
                      justifyContent: { xs: "center", sm: "left" },
                    }}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <Typography color={"#333"} mr={1} variant="h4">
                      SALE UP TO
                    </Typography>
                    <Typography color={"#D23F57"} variant="h4">
                      30% OFF
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 300,
                      my: 1,
                    }}
                    variant="body1"
                  >
                    Get Free Shipping on orders over $99.00
                  </Typography>

                  <a href="#select-product" style={{ textDecoration: "none" }}>
                    <Button
                      sx={{
                        px: 5,
                        py: 1,
                        mt: 2,
                        backgroundColor: "#222",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        color: "#fff",
                        borderRadius: "1px",
                        "&:hover": {
                          bgcolor: "#151515",
                          boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        },
                      }}
                      variant="contained"
                    >
                      shop now
                    </Button>
                  </a>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
}
