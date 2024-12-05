import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  MenuItem,
  Select,
  Grid2 as Grid,
  Paper,
  Checkbox,
  Box,
  Card,
} from "@mui/material";

import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import "./App.css";
import ReportsGrid from "./components/ReportsGrid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import i18n from "./i18n";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const [data, setData] = useState([]); // Holds the CSV data
  const [filters, setFilters] = useState({ reportType: "", year: "" });
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

  // Set theme based on language
  const theme = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr",
  });

  // Update document direction when language changes
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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

        <Grid container spacing={2} p={2}>
          <Grid item size={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: "2px" }}>
              {t("report_type_label")}
            </Typography>
            <Select
              fullWidth
              value={filters.reportType}
              onChange={(e) => handleFilterChange("reportType", e.target.value)}
              displayEmpty
            >
              <MenuItem value="">{t("all")}</MenuItem>
              {[...new Set(data.map((row) => row.report_type))].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Year Filter */}
          <Grid item size={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: "2px" }}>
              {t("year_label")}
            </Typography>
            <Select
              fullWidth
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              displayEmpty
              disabled={!filters.reportType && !data.length} // Disable if no data or no report type selected
            >
              <MenuItem value="">{t("all")}</MenuItem>
              {[
                ...new Set(
                  data
                    .filter((row) =>
                      filters.reportType
                        ? row.report_type === filters.reportType
                        : true
                    )
                    .map((row) => row.year)
                ),
              ]
                .sort((a, b) => a - b) // Sort years in ascending order
                .map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>

        {/* Row 4: File List */}
        <Box p={2}>
          <ReportsGrid
            filteredData={filteredData}
            selectedFiles={selectedFiles}
            handleFileSelection={handleFileSelection}
            handleViewPdf={handleViewPdf}
          />
        </Box>

        <Grid container spacing={2} p={2}>
          <Grid item size={6}>
            <Card variant="outlined" style={{ padding: 16, height: "100%" }}>
              <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                {t("summary_label")}
              </Typography>
              <Button
                disabled={selectedFiles.length === 0}
                style={{ marginTop: 16 }}
                sx={{
                  backgroundColor: "#2683e8",
                  padding: "8px 12px",
                  borderRadius: 2,
                  color: "white",
                  fontWeight: "bold",
                  "&.Mui-disabled": {
                    backgroundColor: "#E0E0E0",
                    color: "#B1ACA6",
                  },
                }}
              >
                {t("summarize_button_text")}
              </Button>
            </Card>
          </Grid>

          {/* Right Column: PDF Viewer */}
          <Grid item size={6}>
            <Card variant="outlined" style={{ padding: 16, height: "100%" }}>
              <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                {t("file_display_label")}
              </Typography>
              {selectedPdf ? (
                <iframe
                  src={selectedPdf}
                  style={{ width: "100%", height: 400, marginTop: 16 }}
                />
              ) : (
                <Typography
                  variant="body1"
                  style={{ marginTop: 16, fontStyle: "italic" }}
                >
                  {t("no_pdf_selected")}
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
