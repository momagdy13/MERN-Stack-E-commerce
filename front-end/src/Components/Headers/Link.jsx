import { ExpandMore, KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function Link({ title }) {
  return (
    <Box
      sx={{
        ":hover .show-when-hover": { display: "block" },
        ":hover": { cursor: "pointer" },

        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "50px",
        width: "180px",
      }}
    >
      <Typography variant="body1">{title} </Typography>

      <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />

      <Box
        className=" show-when-hover"
        sx={{
          position: "absolute",
          top: "100%",
          minWidth: "160px",
          left: "40%",
          transform: " translateX(-50%)",
          display: "none",
          zIndex: 2,
        }}
      >
        <Paper sx={{ mt: 2 }} className=" ">
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    p: 0,
                    px: 1.5,
                  }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                    primary="Dashboard"
                  />
                  <Box flexGrow={1} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    p: 0,
                    px: 1.5,
                  }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                    primary="orders"
                  />
                  <Box flexGrow={1} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    p: 0,
                    px: 1.5,
                  }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 300,
                      },
                    }}
                    primary="Profile"
                  />
                  <Box flexGrow={1} />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Paper>
      </Box>
    </Box>
  );
}
