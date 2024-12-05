import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import "../App.css";
const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language || "en");

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

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#262626",
          boxShadow: "none",
          padding: "16px 8px",
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
            {/* <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#818181",
                margin: "0 16px",
                height: "30px",
              }}
            /> */}
            <Button
              sx={{
                color: "#262626",
                border: "1px solid white",
                padding: "4px 12px",
                borderRadius: 8,
                backgroundColor: "white",
                fontWeight: "bold",
              }}
              onClick={() => {
                console.log("Logout clicked");
                // Implement your logout logic here
              }}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
