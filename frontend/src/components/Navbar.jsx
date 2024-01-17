import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const drawerWidth = 240;
const navItems = ["Home", "Post"];
const navLinks = {
  Home: "/",
  
  Post: "/postsecret",
};

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useAuth();
  console.log(user)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} >
        {user?(`${user.email.slice(0,10)}...`):"User"}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <Link
              to={navLinks[item]}
              style={{
                color: "black",
                textDecoration: "none",
                textAlign: "center",
                margin: "auto",
              }}
            >
              
              {item}
            </Link>
          </ListItem>
        ))}

        {!user && (
          <ListItem disablePadding>
            <Link
              to={"/signin"}
              style={{
                color: "black",
                textDecoration: "none",
                textAlign: "center",
                margin: "auto",
              }}
            >
              
              Signin
            </Link>
          </ListItem>
        )}
        {!user && (
          <ListItem disablePadding>
            <Link
              to={"/signup"}
              style={{
                color: "black",
                textDecoration: "none",
                textAlign: "center",
                margin: "auto",
              }}
            >
              
              SignUp
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ zIndex:"5"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
             {user?(user.email):"User"}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, i) => (
              <Button key={i} sx={{ color: "#fff" }}>
                {/* {item} */}
                <Link
                  to={navLinks[item]}
                  style={{ color: "#fff", textDecoration: "none",margin:"auto 2px" }}
                >
                  {" "}
                  {item}
                </Link>
              </Button>
            ))}
            {!user && (
              <Link
                to={"/signin"}
                style={{ color: "#fff", textDecoration: "none",margin:"auto 6px"  }}
              >
                
                Signin
              </Link>
            )}
            {!user && (
              <Link
                to={"/signup"}
                style={{ color: "#fff", textDecoration: "none" ,margin:"auto 6px" }}
              >
                {" "}
                SignUp
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
