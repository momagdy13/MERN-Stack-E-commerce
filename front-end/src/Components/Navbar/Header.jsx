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
} from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { ShopContext } from "../../Contexs/ShopContext";
import logo from "../Assest/mo-transformed.webp";
import GoogleTranslate from "../GoogleTranslate/GoogleTranslate";
export default function Header() {
  const { cart } = useContext(ShopContext);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const handleSearchButton = (item) => {
    if (item == "" || null) {
      navigate("/");
    } else {
      navigate("/result/search", { state: { item } });
    }
  };
  const [search, setSearch] = useState("");
  // User Menu //
  const [menu, setMenu] = useState(null);
  const Open = Boolean(menu);
  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  // User Menu //

  return (
    <div className="header">
      {/* Logo  */}
      <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="" style={{ width: "10vh" }} />
          <Typography variant="h4">Shopify</Typography>
        </Box>
      </Link>
      {/* Logo  */}

      {/* Header Search */}
      <div className="header-search">
        <input
          name="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IconButton
          onClick={() => {
            handleSearchButton(search), setSearch("");
          }}
        >
          <CiSearch size={"70px"} />
        </IconButton>
      </div>
      {/* Header Search */}

      {/* User Menu */}
      {localStorage.getItem("token") ? (
        <Stack direction={"row"} justifyContent={"center"}>
          <Button
            sx={{ width: "10px", borderRadius: "30px", color: "inherit" }}
            id="basic-button"
            aria-controls={Open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Open ? "true" : undefined}
            onClick={handleClick}
          >
            <FaRegCircleUser size={"35px"} />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={menu}
            open={Open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                width: "150px",
                mr: "30px",
                color: "inherit",
              },
            }}
          >
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: `${theme.palette.text.primary}`,
                  fontSize: "19px",
                  fontWeight: "300",
                }}
              >
                <FaRegCircleUser
                  style={{
                    marginRight: "10px",
                    fontSize: "19px",
                    fontWeight: "300",
                  }}
                />{" "}
                Profile
              </MenuItem>
            </Link>

            <Link to={"/order"} style={{ textDecoration: "none" }}>
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: `${theme.palette.text.primary}`,
                  fontSize: "19px",
                  fontWeight: "300",
                }}
              >
                <FiShoppingBag
                  style={{
                    marginRight: "10px",
                    fontSize: "19px",
                    fontWeight: "300",
                  }}
                />{" "}
                Order
              </MenuItem>
            </Link>

            <Link
              to={"/fav"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <MenuItem onClick={handleClose}>
                <FaRegHeart size={"18px"} style={{ marginRight: "10px" }} />
                My List
              </MenuItem>
            </Link>

            <Button
              color="error"
              sx={{ width: "100%" }}
              onClick={() => {
                localStorage.removeItem("token");
                handleClose;
                window.location.replace("/");
              }}
            >
              Log Out
            </Button>
          </Menu>
        </Stack>
      ) : (
        <Link
          to={"/login"}
          type="error"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <button id="sign">Sign In</button>
        </Link>
      )}
      {/* User Menu */}

      {/* Cart Icon */}
      {localStorage.getItem("token") ? (
        <>
          <div className="cart">
            <Link to="/cart" style={{ color: "inherit" }}>
              <span className="count">{cart.quantity}</span>
              <FiShoppingBag size="25px" style={{ marginBottom: "8px" }} />
            </Link>
          </div>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"} style={{ color: "inherit" }}>
            <FiShoppingBag size={"25px"} />
          </Link>
        </>
      )}

      {/* Cart Icon */}

      {/* Translate Icon  */}
      <GoogleTranslate />
      {/* Translate Icon  */}

      {/* Toggle Icon Of Mode  */}
      {theme.palette.mode === "light" ? (
        <IconButton
          onClick={() => {
            localStorage.setItem(
              "mode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            colorMode.toggleColorMode();
          }}
          style={{
            backgroundColor: "var(--bgHeader)",
            height: " 2.4rem",
            width: "2.4rem",
            borderRadius: "50%",
            color: " var(--subtitle)",
            border: "1px solid rgba(244, 165, 96, .249)",
            transition: " .2s",
            boxShadow: "1px 1px 40px #2323242a",
          }}
        >
          <LightModeOutlined
            style={{
              fontSize: "30px",
            }}
          />
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
          style={{
            backgroundColor: "var(--bgHeader)",
            height: " 2.4rem",
            width: "2.4rem",
            borderRadius: "50%",
            color: " var(--subtitle)",
            border: "1px solid rgba(244, 165, 96, .249)",
            transition: " .2s",
            boxShadow: "1px 1px 40px #2323242a",
          }}
        >
          <DarkModeOutlined style={{ fontSize: "30px" }} />
        </IconButton>
      )}
      {/* Toggle Icon Of Mode  */}
    </div>
  );
}
