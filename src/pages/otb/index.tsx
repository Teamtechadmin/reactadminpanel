import { Grid } from "@mui/material";
import React from "react";
import SearchHeaders from "../customers/components/search/SearchHeaders";
import { useForm } from "react-hook-form";
import DataTable from "./components/table/DataTable";

const OtbPage = () => {
  const { control } = useForm();
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable />
    </Grid>
  );
};

OtbPage.authGuard = true;
OtbPage.guestGuard = false;

export default OtbPage;
