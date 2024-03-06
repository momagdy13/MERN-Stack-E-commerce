import {
  Button,
  Typography,
  Box,
  useTheme,
  ListItemText,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowRight, WindowRounded } from "@mui/icons-material";

export default function Header2() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <Container sx={{ display: "flex", alignItems: "center", mt: 7 }}>
      <Stack>
        <Button
          sx={{ width: "222px", color: theme.palette.text.primary }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <WindowRounded sx={{ marginRight: "8px" }} />
          <Typography>Category</Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRight />
        </Button>
        <Box flexGrow={1} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ "& .MuiPaper-root": { width: "200px" } }}
        >
          <MenuItem onClick={handleClose}>
            {" "}
            <ListItemText>All_Product</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <ListItemText>Men</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <ListItemText>Women</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}> </MenuItem>
        </Menu>
      </Stack>
      <Box flexGrow={1} />
    </Container>
  );
}
