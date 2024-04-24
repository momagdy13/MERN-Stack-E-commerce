import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Fotter() {
  return (
    <Box
      sx={{
        bgcolor: 'black',
        py: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width:'100%',
        position:'absolute',
        bottom:'-49px',
        
      }}
    >
      <Typography
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        color={"HighlightText"}
        variant="h6"
        sx={{ fontSize: 18 }}
      >
        Designed and developed by
        <Link to={"https://www.instagram.com/mmagdy89/"} target="_blank">
          <Button
            sx={{
              mx: 0.5,
              fontSize: "18px",
              textTransform: "capitalize",
              color: "#ff7790",
            }}
            variant="text"
            color="primary"
          >
            Mo Magdy
          </Button>
        </Link>
        ©2024
      </Typography>
    </Box>
  );
}
