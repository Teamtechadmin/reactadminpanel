import { Card, CardHeader, Grid, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../../hooks/columns/customers";
import { useGetUsers } from "@/services/users/get";
import { addKey } from "@/utils/add-key";

const DataTable = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const defaultRowHeight = 55;

  const columns = useColumns();
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data: dealers } = useGetUsers({
    params: { ...params, role: "DEALER" },
  });
  const data = dealers?.data?.data;
  const dataWithId = addKey(data, "id", "_id") || [];
  const totalEntries = dealers?.data?.count || 0;

  return (
    <Card>
      <CardHeader
        sx={{ p: 2 }}
        titleTypographyProps={{ variant: "h6" }}
        title={"Dealers"}
      ></CardHeader>
      <Grid padding={2}>
        <DataGrid
          autoHeight
          pagination
          getRowHeight={() => {
            return isSmallScreen ? defaultRowHeight / 2 : defaultRowHeight;
          }}
          columnHeaderHeight={55}
          disableRowSelectionOnClick
          disableColumnSelector
          columns={columns}
          rows={(dataWithId as any) ?? []}
          rowCount={totalEntries}
          paginationMode="server"
          paginationModel={params}
          onPaginationModelChange={setParams}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 15 } },
          }}
        />
      </Grid>
    </Card>
  );
};

export default DataTable;
