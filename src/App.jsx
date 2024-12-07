import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid2 as Grid,
  Box,
  Snackbar,
  Alert,
  Button,
  Slide,
} from "@mui/material";

import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import "./App.css";
import ReportsGrid from "./components/ReportsGrid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import i18n from "./i18n";
import Filters from "./components/Filters";
import Summary from "./components/Summary";
import PdfViewer from "./components/PdfViewer";
import Feedback from "./components/Feedback";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ reportType: "", year: "" });
  const [feedback, setFeedback] = useState({
    message: "",
    severity: "success",
    showAlert: false,
  });
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await fetch("reports.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json(); // Parse the response as JSON
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const theme = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr",
  });
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((row) => {
    const matchesReportType = filters.reportType
      ? row.report_type === filters.reportType
      : true;
    const matchesYear = filters.year ? row.year === filters.year : true;
    return matchesReportType && matchesYear;
  });

  const handleFileSelection = (id) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((file) => file !== id) : [...prev, id]
    );
  };

  const handleViewPdf = (pdfPath) => {
    setSelectedPdf(pdfPath);
  };
  const handleFeedback = (type, message) => {
    setFeedback({
      message: message,
      severity: type,
      showAlert: true,
    });
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, showAlert: false }));
    }, 3000);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Feedback
        message={feedback.message}
        severity={feedback.severity}
        showAlert={feedback.showAlert}
      />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Navbar />
        <Box p={2}>
          <Typography
            sx={{ fontSize: "44px", fontWeight: "bold", marginTop: "20px" }}
          >
            {t("page_title")}
          </Typography>
        </Box>

        <Filters
          handleFilterChange={handleFilterChange}
          data={data}
          filters={filters}
        />

        <ReportsGrid
          filteredData={filteredData}
          selectedFiles={selectedFiles}
          handleFileSelection={handleFileSelection}
          handleViewPdf={handleViewPdf}
        />

        <Grid container spacing={2} p={2}>
          <Summary
            selectedFiles={selectedFiles}
            language={i18n.language}
            data={data}
            handleFeedback={handleFeedback}
          />
          <PdfViewer selectedPdf={selectedPdf} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
