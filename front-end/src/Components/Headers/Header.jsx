import {
  Button,
  Container,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header2 = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const productName = (name) => {
    navigate("/result", { state: name });
  };

  return (
    <Container sx={{ my: 3, display: "flex" }}>
      <TextField
        onChange={(e) => {
          setName(e.target.value);
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
            color: "inherit",
          },
          "& .MuiFormLabel-root.MuiInputLabel-root": {
            color: "inherit",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "unset !important",
            borderRadius: "25px",
            width: "556px",
          },
          "& .MuiInputBase-input.MuiOutlinedInput-input": { width: "490px" },
          width: "500px",
          ml: "250px",
        }}
        name="search"
        label="Search....."
        required
      />

      <IconButton
        onClick={() => {
          productName(name);
        }}
      >
        <SearchIcon style={{ fontSize: "40px" }} />
      </IconButton>
    </Container>
  );
};

export default Header2;
