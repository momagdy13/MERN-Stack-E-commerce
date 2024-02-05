import * as React from "react";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../Them";
import {
  IconButton,
  useTheme,
  Typography,
  Stack,
  ListItem,
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  Facebook,
  Instagram,
  LightModeOutlined,
  Twitter,
} from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = ["AR", "EN"];

export default function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: "#2B3445", py: "4px" }}>
      <Container>
        {" "}
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            sx={{
              mr: 2,
              ml: 1,
              p: "1px 7px",
              bgcolor: "#D23F57",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#fff",
            }}
            variant="body2"
          >
            HOT
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 300,
              color: "#fff",
            }}
            variant="body2"
          >
            Free Express Shipping
          </Typography>
          <Box flexGrow={1} />

          <div>
            {theme.palette.mode === "light" ? (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="white"
              >
                <LightModeOutlined fontSize="mid" sx={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                <DarkModeOutlined fontSize="mid" sx={{ color: "white" }} />
              </IconButton>
            )}
          </div>

          <List
            component="nav"
            aria-label="Device settings"
            sx={{ p: 0, m: 0 }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              sx={{ "&:hover": { cursor: "pointer" }, px: 1 }}
            >
              <ListItemText
                sx={{
                  ".MuiTypography-root": { fontSize: "15px", color: "#fff" },
                }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px", color: "#fff" }} />
            </ListItem>
          </List>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "15px", p: "3px 10px", minHeight: "10px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          <Twitter
            sx={{
              fontSize: "25px",
              color: "#fff",
              mr: 1,
            }}
          />
          <Facebook
            sx={{
              fontSize: "25px",
              mx: 1,
              color: "#fff",
              mr: 1,
            }}
          />
          <Instagram
            sx={{
              fontSize: "25px",
              color: "#fff",
              mr: 1,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
