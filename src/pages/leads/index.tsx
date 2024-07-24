import TabList from "@/components/ui/tabs/TabList";
import { tabs } from "@/data/leads/tabs";
import useColumns from "@/hooks/columns/leads";
import { useGetLeads } from "@/services/leads/list/get";
import { GetLeadParams, Lead, LeadStatus } from "@/services/leads/list/types";
import { useLeadStore } from "@/store/leads/store";
import { addKey } from "@/utils/add-key";
import { handleRedirection } from "@/utils/handle-redirection";
import SearchHeaders from "@/views/customers/searchHeader/SearchHeaders";
import AddLeadDialogue from "@/views/leads/dailogue/AddLeadDialogue";
import AssignEvaluatorDialogue from "@/views/leads/dailogue/AssignEvaluatorDialogue";
import { Button, Card, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

function LeadsPage() {
  const [value, setValue] = useState<LeadStatus>(tabs[0].value);
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [leadID, setLeadID] = useState("");
  const [params, setParams] = useState<GetLeadParams>({
    page: 0,
    pageSize: 10,
  });

  const router = useRouter();
  const handleAssign = (row: Lead) => {
    setOpenAssign(!openAssign);
    setLeadID(row._id);
  };

  const { setLead } = useLeadStore();
  const handleView = (row: Lead) => {
    setLead(row);
    handleRedirection("leads", row?._id, router);
  };

  const columns = useColumns({
    handleAssign,
    handleView,
  });
  const { data: leads, isLoading } = useGetLeads({
    params: { ...params, status: value },
  });

  const data = addKey(leads?.data.data ?? [], "id", "_id") || [];

  const handleAdd = () => setOpen(!open);

  const { control } = useForm();

  return (
    <>
      <Grid>
        <Grid marginTop={3}>
          <TabList
            tabOptions={tabs}
            value={value}
            setValue={setValue as Dispatch<SetStateAction<string>>}
          />
        </Grid>
        <SearchHeaders control={control} />
        <Card>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography padding={2} variant="h6">
              Leads
            </Typography>
            <Grid padding={2}>
              <Button onClick={handleAdd} variant="contained">
                Add Lead
              </Button>
            </Grid>
          </Grid>
          <Grid padding={2}>
            <DataGrid
              autoHeight
              pagination
              columnHeaderHeight={55}
              disableRowSelectionOnClick
              disableColumnSelector
              columns={(columns as any) ?? []}
              loading={isLoading}
              rows={data ?? []}
              rowCount={leads?.data?.count ?? 0}
              paginationMode="server"
              paginationModel={params}
              onPaginationModelChange={setParams as any}
            />
          </Grid>
        </Card>
      </Grid>
      <AddLeadDialogue open={open} setOpen={setOpen} />
      <AssignEvaluatorDialogue
        open={openAssign}
        setOpen={setOpenAssign}
        leadID={leadID}
      />
    </>
  );
}

export default LeadsPage;
