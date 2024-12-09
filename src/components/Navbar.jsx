// NavBar.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Select, MenuItem } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <Select
      value={currentLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      displayEmpty
      style={{ color: "white", marginLeft: "1rem" }} // Styling for better contrast
    >
      <MenuItem value="en">
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em" }}
          title="US"
        />
        English
      </MenuItem>
      <MenuItem value="ar">
        <ReactCountryFlag
          countryCode="LY"
          svg
          style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em" }}
          title="LY"
        />
        العربية
      </MenuItem>
    </Select>
  );
};

const Navbar = () => {
  const { i18n, t } = useTranslation(); // `t` can be used for translations if needed
  const [language, setLanguage] = useState(i18n.language || "en"); // Initialize with the current i18n language

  const handleLanguageChange = (lang) => {
    setLanguage(lang); // Update state
    i18n.changeLanguage(lang); // Change the language in i18n
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img
            src="/src/assets/logo3.png" // Ensure the path to the logo is correct
            alt="Logo"
            style={{ height: 40 }}
          />
        </Typography>
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
