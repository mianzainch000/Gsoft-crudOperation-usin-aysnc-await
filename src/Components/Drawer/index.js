import { useState } from "react";
import drawerStyling from "./drawerStyling.module.css";
import { NavLink } from "react-router-dom";
import { Drawer, Box, IconButton, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

export const DrawerComp = () => {
  const [isDraweOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </div>
      <Drawer
        anchor="top"
        open={isDraweOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            display: "flex;",
            justifyContent: "center;",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ color: "goldenrod;", pt: 1 }}
          >
            Crud Operation
          </Typography>
        </Box>
        <Box p={2} width="236px" className={drawerStyling.drawer}>
          <Button color="inherit" className={drawerStyling.button}>
            <NavLink
              to="/"
              className={drawerStyling.button}
              onClick={() => setDrawerOpen(false)}
            >
              Create
            </NavLink>
          </Button>{" "}
          <Button color="inherit" className={drawerStyling.button}>
            <NavLink
              to="/read"
              className={drawerStyling.button}
              onClick={() => setDrawerOpen(false)}
            >
              Read
            </NavLink>
          </Button>{" "}
        </Box>
      </Drawer>
    </div>
  );
};
