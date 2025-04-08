import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import DateTimeDisplay from "./DateTimeDisplay";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const pages = [
  "News",
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const primaryPages = ["News", "Business"];
const morePages = pages.filter((page) => !primaryPages.includes(page));

const appTitle = "PEIK NEWS";

function ResponsiveAppBar({ themeMode, handleThemeMode }) {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElMore, setAnchorElMore] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenMoreMenu = (event) => setAnchorElMore(event.currentTarget);
  const handleCloseMoreMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setAnchorElMore(null);
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="span"
            onClick={handleBackToHome}
            sx={{
              mr: 2,
              cursor: "pointer",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>

          {/* Mobile Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleScroll(page);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="span"
            onClick={handleBackToHome}
            sx={{
              mr: 2,
              cursor: "pointer",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <SearchBar />
          </Box>

          {/* Primary Pages + More Dropdown */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {primaryPages.map((page) => (
              <Button
                key={page}
                onClick={() => handleScroll(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}

            <Box sx={{ my: 2 }}>
              <Button
                sx={{ color: "white" }}
                onClick={
                  anchorElMore ? handleCloseMoreMenu : handleOpenMoreMenu
                }
              >
                More
                <KeyboardArrowDownIcon fontSize="small" />
              </Button>
              <Menu
                anchorEl={anchorElMore}
                open={Boolean(anchorElMore)}
                onClose={handleCloseMoreMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {morePages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleScroll(page);
                      handleCloseMoreMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Theme Switch */}

            <ThemeSwitch
              themeMode={themeMode}
              handleThemeMode={handleThemeMode}
            />
            {/* Date Display */}

            <DateTimeDisplay />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
