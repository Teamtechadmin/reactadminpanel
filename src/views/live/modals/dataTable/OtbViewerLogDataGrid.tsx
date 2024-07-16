import { viewersLogOtb } from "@/dummy/viewers-otb-log";
import { useColumns } from "@/hooks/columns/viewers-auction-log";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

function OtbViewerLogDataGrid() {
  const columns = useColumns();
  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={viewersLogOtb as any}
        disableColumnSelector
        rowSelection={false}
      />
    </Grid>
  );
}

export default OtbViewerLogDataGrid;
