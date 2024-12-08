import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language || "en");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle language change
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    document.dir = newLanguage === "ar" ? "rtl" : "ltr"; // Adjust document direction
  };

  // Create a theme with dynamic direction
  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage or any other session data
    navigate("/login"); // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#262626",
          boxShadow: "none",
          padding: "8px",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="src/assets/logo2.png" alt="Logo" style={{ height: 40 }} />
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
          >
            <Button
              onClick={toggleLanguage}
              sx={{
                color: "white",
                border: "1px solid white",
                padding: "4px 12px",
                borderRadius: 8,
                fontWeight: "bold",
              }}
            >
              <HiOutlineGlobeAlt style={{ margin: "0px 4px" }} />
              {language === "en" ? "العربية" : "English"}
            </Button>

            <Button
              sx={{
                color: "#262626",
                border: "1px solid white",
                padding: "4px 12px",
                borderRadius: 8,
                backgroundColor: "white",
                fontWeight: "bold",
              }}
              onClick={handleLogout} // Call the handleLogout function
            >
              {t("logout")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
