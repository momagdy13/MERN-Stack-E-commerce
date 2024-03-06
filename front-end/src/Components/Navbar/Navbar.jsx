import * as React from "react";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../Them";
import {
  IconButton,
  useTheme,
  Typography,
  Stack,
  ListItem,
  Badge,
  Button,
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  Facebook,
  Instagram,
  LightModeOutlined,
  ShoppingCartOutlined,
  Twitter,
} from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Contexs/ShopContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const Open = Boolean(anchor);
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
    <Box sx={{ bgcolor: "#2B3445", py: "4px" }}>
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "20px",
              fontFamily: "inherit",
            }}
          >
            Mo_Shop
          </Typography>
          <Link to={"/"}>
            <ShoppingCartOutlined
              sx={{ cursor: "pointer", color: theme.palette.text.secondary }}
            />
          </Link>

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
          <IconButton>
            <Link to={"https://twitter.com/"} target="_blank">
              <Twitter
                sx={{
                  fontSize: "25px",
                  color: "#fff",
                  mr: 1,
                  mt: 1,
                }}
              />
            </Link>
          </IconButton>
          <IconButton>
            <Link to={"https://web.facebook.com/?_rdc=1&_rdr"} target="_blank">
              <Facebook
                sx={{
                  fontSize: "25px",
                  mx: 1,
                  color: "#fff",
                  mr: 1,
                  mt: 1,
                }}
              />
            </Link>{" "}
          </IconButton>
          <IconButton>
            <Link to={"https://www.instagram.com/mmagdy89/"} target="_blank">
              <Instagram
                sx={{
                  fontSize: "25px",
                  color: "#fff",
                  mr: 1,
                  mt: 1,
                }}
              />
            </Link>
          </IconButton>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={getTotalCartItems()} color="secondary">
                <Link to={"/cart"}>
                  <ShoppingCartIcon
                    sx={{
                      color: theme.palette.text.disabled,
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
                  sx={{ width: "150px", color: theme.palette.text.primary }}
                  id="basic-button"
                  aria-controls={Open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleIcon
                    sx={{ marginRight: "8px", color: "ghostwhite" }}
                  />
                  <Typography sx={{ color: "ghostwhite" }}>My Account</Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchor}
                  open={Open}
                  onClose={HandleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{ "& .MuiPaper-root": { width: "150px", mr: "30px" } }}
                >
                  <Link to={"/profile"}>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <ListItemText sx={{ color: theme.palette.text.primary }}>
                        Profile
                      </ListItemText>
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
                    color: theme.palette.text.secondary,
                  }}
                >
                  <Person2OutlinedIcon
                    sx={{ color: theme.palette.text.secondary }}
                  />
                  Log-In
                </Link>
              </IconButton>
            )}
          </Stack>
          <Box id="google_translate_element" ></Box>
        </Stack>
      </Container>
    </Box>
  );
}
