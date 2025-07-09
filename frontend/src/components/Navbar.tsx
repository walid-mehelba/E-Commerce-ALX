import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../context/Cart/CartContext";

function Navbar() {
  const { email, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register")
  }

  const handeMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  }

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="sticky"
      sx={{
        backgroundColor: "#00296B",
        backdropFilter: "blur(10px)",
        color: "#E0E1DD",
        boxShadow: "0 1px 8px rgba(0,0,0,0.1)",
      }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#E0E1DD", fontWeight: 700 }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Tech Hub
                </Typography>
              </Box>
            </Button>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 0,
                alignItems: "center",
              }}
              gap={2}
            >
              {isAuthenticated ? (
                <>
                  <Grid>
                    <IconButton aria-label="cart" onClick={handleCart}>
                      <Badge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCart sx={{ color: "#E0E1DD" }} />
                      </Badge>
                    </IconButton>
                  </Grid>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Grid>
                        <Typography>{email}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={email || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handeMyOrders}>
                      <Typography sx={{ textAlign: "center" }}>
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>{" "}
                </>
              ) : (
                <Box display="flex" gap={2}>
                  <Button
                    sx={{ color: "#E0E1DD" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ color: "#E0E1DD" }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
