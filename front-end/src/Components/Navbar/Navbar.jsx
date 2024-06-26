import * as React from "react";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../Them";
import {
  IconButton,
  useTheme,
  Typography,
  Stack,
  Badge,
  Button,
  Collapse,
} from "@mui/material";
import {
  Close,
  DarkModeOutlined,
  Facebook,
  Instagram,
  LightModeOutlined,
  ShoppingCartOutlined,
  Twitter,
} from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../../Contexs/ShopContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GTranslateIcon from "@mui/icons-material/GTranslate";
export default function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const Open = Boolean(anchor);
  const [open, setOpen] = useState("");
  const [icon, setIcon] = useState("true");
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const { getTotalCartItems, FavNumber } = useContext(ShopContext);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleClose = () => {
    setAnchor(null);
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  React.useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <Box sx={{ bgcolor: "black", py: "4px" }} id="nav">
      <Stack
        direction={{ xs: "row", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        px={{ xs: 2, sm: 4 }}
      >
        <Typography
          sx={{
            color: "ghostwhite",
            fontSize: "20px",
            fontFamily: "inherit",
          }}
        ></Typography>
        <Link to={"/"} style={{ textDecoration: "none", color: "ghostwhite" }}>
          <ShoppingCartOutlined
            sx={{ cursor: "pointer", color: "ghostwhite" }}
          />
          Mo_Shop
        </Link>

     <Stack id="navText">
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
     </Stack>
        <Box flexGrow={1} />

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

        <IconButton>
          <StyledBadge badgeContent={FavNumber()} color="secondary">
            <Link to={"/fav"}>
              <FavoriteIcon
                sx={{
                  fontSize: "30px",
                  color: "white",
                  mt: "10px",
                }}
              />
            </Link>
          </StyledBadge>
        </IconButton>

        <Stack direction={"row"} alignItems={"center"}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={getTotalCartItems()} color="secondary">
              <Link to={"/cart"}>
                <ShoppingCartIcon
                  sx={{
                    color: "ghostwhite",
                    mt: "10px",
                    fontSize: "30px",
                  }}
                />
              </Link>
            </StyledBadge>
          </IconButton>

          {localStorage.getItem("token") ? (
            <Stack direction={"row"} justifyContent={"center"}>
              <Button
                sx={{ width: "150px", color: "ghostwhite" }}
                id="basic-button"
                aria-controls={Open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon
                  sx={{ marginRight: "8px", color: "ghostwhite" }}
                />
                <Typography sx={{ color: "ghostwhite" }} variant="h7">
                  My Account
                </Typography>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchor}
                open={Open}
                onClose={HandleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    width: "150px",
                    mr: "30px",
                    color: "ghostwhite",
                  },
                }}
              >
                <Link to={"/profile"} style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <ListItemText sx={{ color: "black" }}>Profile</ListItemText>
                  </MenuItem>
                </Link>
                <MenuItem>
                  <Button
                    color="error"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.replace("/");
                    }}
                  >
                    Log Out
                  </Button>
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <IconButton>
              <Link
                to={"/login"}
                type="error"
                style={{
                  textDecoration: "none",
                  color: "ghostwhite",
                }}
              >
                <Person2OutlinedIcon sx={{ color: "ghostwhite" }} />
                Log-In
              </Link>
            </IconButton>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} className="translate">
          <Collapse in={icon}>
            <GTranslateIcon
              sx={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={() => {
                setOpen(true);
                setIcon(false);
              }}
            />
          </Collapse>
          <Collapse in={open}>
            <Stack direction={"row"} alignItems="center">
              <Box id="google_translate_element" />
              <Close
                sx={{ cursor: "pointer", ml: 1 }}
                onClick={() => {
                  setOpen(false);
                  setIcon(true);
                }}
              />
            </Stack>
          </Collapse>
        </Stack>
      </Stack>
    </Box>
  );
}
