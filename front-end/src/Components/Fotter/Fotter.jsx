import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Fotter() {
  return (
    <Box
      sx={{
        bgcolor: "#2115",
        py: 1.3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
        ©2024
      </Typography>
    </Box>
  );
}
