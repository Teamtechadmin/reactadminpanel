import { useColumns } from "@/hooks/columns/live-auction-log";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface Props {
  log: any;
}

export const AuctionLogDataGrid = (props: Props) => {
  const { log } = props;
  const columns = useColumns();
  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={log ?? []}
        disableColumnSelector
        rowSelection={false}
        pageSizeOptions={[]}
      />
    </Grid>
  );
};
