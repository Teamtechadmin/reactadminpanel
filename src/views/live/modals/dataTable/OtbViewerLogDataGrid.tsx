import { useColumns } from "@/hooks/columns/viewers-auction-log";
import { addKey } from "@/utils/add-key";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

interface Props {
  data: any;
}

function OtbViewerLogDataGrid(props: Props) {
  const columns = useColumns();
  const { data } = props;
  const watchList = addKey(data, "id", "_id");

  return (
    <Grid>
      <DataGrid
        columns={columns}
        rows={(watchList as any) ?? []}
        disableColumnSelector
        rowSelection={false}
        pageSizeOptions={[]}
        sx={{
          height: 350,
        }}
      />
    </Grid>
  );
}

export default OtbViewerLogDataGrid;
