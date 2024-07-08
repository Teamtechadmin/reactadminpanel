import { viewersLogAuctions } from "@/dummy/viewers-auction-log";
import { useColumns } from "@/hooks/columns/viewers-auction-log";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

function AuctionViewerLogDataGrid() {
  const columns = useColumns();
  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={viewersLogAuctions}
        disableColumnSelector
        rowSelection={false}
      />
    </Grid>
  );
}

export default AuctionViewerLogDataGrid;
