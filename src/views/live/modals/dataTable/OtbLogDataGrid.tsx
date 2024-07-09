import { liveLogOtb } from "@/dummy/live-otb-log";
import { useColumns } from "@/hooks/columns/live-otb-log";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function OtbLogDataGrid() {
  const columns = useColumns();
  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={liveLogOtb}
        disableColumnSelector
        rowSelection={false}
      />
    </Grid>
  );
}
