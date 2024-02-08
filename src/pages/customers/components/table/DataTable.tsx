import { Card, CardHeader, Theme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useColumns from "../../hooks/columns";
import { customers } from "@/dummy/customers";

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

  return (
    <Card>
      <CardHeader
        sx={{ p: 2 }}
        titleTypographyProps={{ variant: "h6" }}
        title={"Customers"}
      ></CardHeader>
      <DataGrid
        autoHeight
        pagination
        getRowHeight={() => {
          return isSmallScreen ? defaultRowHeight / 2 : defaultRowHeight;
        }}
        columnHeaderHeight={55}
        disableRowSelectionOnClick
        columns={columns}
        rows={customers}
        paginationMode="server"
        paginationModel={params}
        onPaginationModelChange={setParams}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 15 } },
        }}
      />
    </Card>
  );
};

export default DataTable;
