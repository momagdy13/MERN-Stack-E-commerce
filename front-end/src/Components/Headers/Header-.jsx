import {
  Button,
  Typography,
  Box,
  useTheme,
  IconButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Close,
  ClosedCaption,
  KeyboardArrowRight,
  WindowRounded,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ComputerIcon from "@mui/icons-material/Computer";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "./Link";

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

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  {
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Container sx={{ display: "flex", alignItems: "center", mt: 7}}>
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
          <ListItemIcon>
            <DirectionsBikeIcon />
          </ListItemIcon>
          <ListItemText>Bikes</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText>Electronics</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText>Games</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>Books</ListItemText>
        </MenuItem>
      </Menu>

      {useMediaQuery("(max-width:1000px)") && (
        <IconButton onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </IconButton>
      )}
      {useMediaQuery("(min-width:1000px)") && (
        <Stack direction={"row"} alignItems={"center"}>
          <Link title={"Home"} />
          <Link title={"Pages"} />
          <Link title={"User Account"} />
        </Stack>
      )}

      <SwipeableDrawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
      >
        {true && (
          <Box
            sx={{
              width: 444,
              mx: "auto",
              mt: 6,
              position: "relative",
              pt: 10,
              "& .MuiPaper-elevation  ": { height: "100%" },
            }}
          >
            <IconButton
              sx={{
                ":hover": {
                  color: "red",
                  rotate: "180deg",
                  transition: "0.3s",
                },
                position: "absolute",
                top: 0,
                right: 10,
              }}
              onClick={toggleDrawer("top", false)}
            >
              <Close />
            </IconButton>

            {[
              { mainLink: "Home", subLinks: ["Link 1", "Link 2", "Link 3"] },

              { mainLink: "pages", subLinks: ["Link 1", "Link 2", "Link 3"] },
              {
                mainLink: "user account",
                subLinks: ["Link 1", "Link 2", "Link 3"],
              },
            ].map((item) => {
              return (
                <Accordion
                  key={item.mainLink}
                  elevation={0}
                  sx={{ bgcolor: "initial", p: 0, m: 0 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{item.mainLink}</Typography>
                  </AccordionSummary>

                  <List sx={{ py: 0, my: 0 }}>
                    {item.subLinks.map((link) => {
                      return (
                        <ListItem key={link} sx={{ py: 0, my: 0 }}>
                          <ListItemButton>
                            <ListItemText primary={link} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Accordion>
              );
            })}
          </Box>
        )}
      </SwipeableDrawer>
    </Container>
  );
}
