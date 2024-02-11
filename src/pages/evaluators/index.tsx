import { Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SearchHeaders from "../customers/components/search/SearchHeaders";
import DataTable from "./components/table/DataTable";

const defaultValues = {
  name: "",
  status: "",
};

const Evaluators = () => {
  const { control } = useForm({
    defaultValues,
  });

  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable />
    </Grid>
  );
};

Evaluators.authGuard = true;
Evaluators.guestGuard = false;

export default Evaluators;
