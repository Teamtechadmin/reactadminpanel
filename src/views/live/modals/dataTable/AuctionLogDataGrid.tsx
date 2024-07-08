import { liveLogAuctions } from "@/dummy/live-auction-log";
import { useColumns } from "@/hooks/columns/live-auction-log";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const AuctionLogDataGrid = () => {
  const columns = useColumns();
  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={liveLogAuctions}
        disableColumnSelector
        rowSelection={false}
      />
    </Grid>
  );
};
