import React from "react";
import SearchHeaders from "../customers/components/search/SearchHeaders";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DataTable from "./components/table/DataTable";

const Results = () => {
  const { control } = useForm();
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable />
    </Grid>
  );
};

Results.authGuard = true;
Results.guestGuard = false;

export default Results;
