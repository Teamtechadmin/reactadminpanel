import { Grid } from "@mui/material";
import React from "react";
import SearchHeaders from "../../views/customers/searchHeader/SearchHeaders";
import { useForm } from "react-hook-form";
import DataTable from "../../views/otb/dataTable/DataTable";

const OtbPage = () => {
  const { control, watch } = useForm();
  const [search] = watch(["search"]);
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable searchText={search} />
    </Grid>
  );
};

OtbPage.authGuard = true;
OtbPage.guestGuard = false;

export default OtbPage;
