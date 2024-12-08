import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../App.css";

const paginationModel = { page: 0, pageSize: 8 };
const ReportsGrid = ({
  filteredData,
  selectedFiles,
  handleFileSelection,
  handleViewPdf,
}) => {
  const { t } = useTranslation();

  return (
    <Box p={2}>
      <DataGrid
        rows={filteredData.map((row, index) => ({
          id: row.id,
          name: row.name,
          pdfPath: row.pdf_path,
          mdPath: row.md_path,
        }))}
        columns={[
          {
            field: "select",
            headerName: "",
            width: 50,
            renderCell: (params) => (
              <Checkbox
                checked={selectedFiles.includes(params.row.id)}
                onChange={() => handleFileSelection(params.row.id)}
                sx={{
                  color: selectedFiles.includes(params.row.id)
                    ? "#2683E8"
                    : "default",
                  "&.Mui-checked": {
                    color: "#2683E8", // Customize the checkbox color when checked
                  },
                }}
              />
            ),
          },
          {
            field: "name",
            headerName: "File Name",
            flex: 1,
            renderCell: (params) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {params.value}
              </Box>
            ),
          },
          {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleViewPdf(params.row.pdfPath)}
                  sx={{
                    border: "1px solid #262626",
                    padding: "4px 12px",
                    borderRadius: 4,
                    color: "#262626",
                    fontWeight: "bold",
                    background: "none",
                  }}
                  elevation={0}
                >
                  {t("view_button_text")}
                </Button>
              </Box>
            ),
          },
        ]}
        initialState={{ pagination: { paginationModel } }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            display: "none", // Hide header
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F9FAFB", // Change the hover background color of the rows
          },
          overflowY: "hidden",
          overflowX: "hidden",
        }}
        disableVirtualization
        selectionModel={[]}
      />
    </Box>
  );
};

export default ReportsGrid;