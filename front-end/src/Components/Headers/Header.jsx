import React, { useState } from "react";
import {
  Container,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Header2 = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const productName = (name) => {
    if (name === "") {
      navigate("/");
    } else {
      navigate("/result", { state: { name } });
    }
  };

  return (
    <Container
      sx={{
        my: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        onChange={(e) => setName(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            width: "100%",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "unset !important",
          },
          width: "500px",
          maxWidth: "90%",
          "@media (max-width:800px)": {
            ml: 0,
            width: "100%",
          },
        }}
        name="search"
        label="Search..."
        variant="outlined"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => productName(name)}
                edge="end"
                sx={{ p: 1 }}
              >
                <SearchIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default Header2;
