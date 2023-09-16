import React from "react";
import navbarStyling from "./navbarStyling.module.css";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { useTheme, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DrawerComp } from "../Drawer";

export const NavbarComp = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ bgcolor: "black;" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Button color="inherit">
              <HomeIcon style={{ fontSize: "40px" }} />
            </Button>{" "}
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: "goldenrod;",
              fontSize: "22px",
            }}
          >
            Crud Operation
          </Typography>
          <Toolbar>
            {isMatch ? (
              <>
                <DrawerComp />
              </>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <Button color="inherit"></Button>
                  <Button color="inherit" className={navbarStyling.button}>
                    <NavLink to="/" className={navbarStyling.button}>
                      Create
                    </NavLink>
                  </Button>{" "}
                  <Button color="inherit" className={navbarStyling.button}>
                    <NavLink to="/read" className={navbarStyling.button}>
                      Read
                    </NavLink>
                  </Button>{" "}
                </Stack>
              </>
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
