import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";

const paginationModel = { page: 0, pageSize: 8 };
const ReportsGrid = ({
  filteredData,
  selectedFiles,
  handleFileSelection,
  handleViewPdf,
}) => {
  const { t } = useTranslation();

  return (
    <DataGrid
      rows={filteredData.map((row, index) => ({
        id: index + 1,
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
            />
          ),
        },
        { field: "name", headerName: "File Name", flex: 1 },
        {
          field: "actions",
          headerName: "Actions",
          width: 150,
          renderCell: (params) => (
            <Button
              onClick={() => handleViewPdf(params.row.pdfPath)}
              sx={{
                color: "white",
                border: "1px solid #262626",
                padding: "4px 12px",
                borderRadius: 8,
                color: "#262626",
                fontWeight: "bold",
                background: "none",
              }}
              elevation={0}
            >
              {t("view_button_text")}
            </Button>
          ),
        },
      ]}
      initialState={{ pagination: { paginationModel } }}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          display: "none", // Hide header
        },
        overflow: "hidden",
      }}
      disableVirtualization
    />
  );
};

export default ReportsGrid;
