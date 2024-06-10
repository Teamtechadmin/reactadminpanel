import TabList from "@/components/ui/tabs/TabList";
import { tabs } from "@/data/leads/tabs";
import useColumns from "@/hooks/columns/leads";
import { useGetLeads } from "@/services/leads/list/get";
import { GetLeadParams, LeadStatus } from "@/services/leads/list/types";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useState } from "react";

function LeadsPage() {
  const [value, setValue] = useState<LeadStatus>("EVOLUTIONCONFIRMED");
  const [params, setParams] = useState<GetLeadParams>({
    page: 1,
    pageSize: 10,
  });

  const handleAssign = (id: string) => {
    console.log(id);
  };

  const handleView = (id: string) => {
    console.log(id);
  };

  const columns = useColumns({
    handleAssign,
    handleView,
  });
  const { data: leads, isLoading } = useGetLeads({
    params: { ...params, status: value },
  });

  return (
    <Grid>
      <Grid marginY={3}>
        <TabList
          tabOptions={tabs}
          value={value}
          setValue={setValue as Dispatch<SetStateAction<string>>}
        />
      </Grid>
      <Grid display={"flex"} justifyContent={"end"}>
        <Button variant="contained">Add Lead</Button>
      </Grid>
      <Grid paddingY={2}>
        <DataGrid
          autoHeight
          pagination
          columnHeaderHeight={55}
          disableRowSelectionOnClick
          disableColumnSelector
          columns={(columns as any) ?? []}
          loading={isLoading}
          rows={leads?.data?.data ?? []}
          //   rowCount={isPost ? count : carsData?.data.count ?? 0}
          paginationMode="server"
          paginationModel={params}
          onPaginationModelChange={setParams as any}
        />
      </Grid>
    </Grid>
  );
}

export default LeadsPage;
