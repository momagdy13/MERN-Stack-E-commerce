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
import hero from "../Assest/man-white-shirt.jpg";
import hero_ from "../Assest/apple-black-glowing-logo.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import slider from "../Assest/02-lestrange.webp";
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
    },
  ];

  return (
    <Container sx={{ display: "flex", alignItems: "center", mt: 6, mb: 6 }}>
      <Box id="hero-left" flexGrow={1} sx={{ overflow: "auto", mr: "20px" }}>
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
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <Box id="hero-right" display={{ xs: "none", md: "block" }}>
        <Box sx={{ position: "relative" }}>
          <img src={hero} height={"280px"} width={"100%"} alt="" />
          <Stack
            sx={{
              position: "absolute",
              top: "60%",
              transform: "translateY(-50%)",
              left: 31,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "25px",
              }}
            >
              NEW ARRIVALS
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: "25px",
                mt: 1,
              }}
            >
              SUMMER
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              SALE 20% OFF
            </Typography>

            <Link
              sx={{
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                gap: "15px",
                transition: "0.2s",
                fontSize: "20px",
                "&:hover": {
                  color: "red",
                },
              }}
              href="#"
              underline="none"
            >
              shop now
              <ArrowForwardIcon sx={{ fontSize: "13px" }} />
            </Link>
          </Stack>
        </Box>

        <Box sx={{ position: "relative" }}>
          <img src={hero_} alt="" />
          <Stack
            sx={{
              position: "absolute",
              top: "70%",
              transform: "translateY(-50%)",
              left: 31,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "white",
                fontSize: "26px",
                fontWeight: 300,
              }}
            >
              GAMING 4K
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                lineHeight: "26px",
                mt: 1,
              }}
            >
              DESKTOPS &
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "white",
              }}
            >
              LAPTOPS
            </Typography>

            <Link
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "0.2s",

                "&:hover": {
                  color: "#D23F57",
                },
              }}
              href="#"
              underline="none"
            >
              shop now
              <ArrowForwardIcon sx={{ fontSize: "26px" }} />
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
