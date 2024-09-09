import { Grid } from "@mui/material";
import React from "react";
import SearchHeaders from "../../views/customers/searchHeader/SearchHeaders";
import { useForm } from "react-hook-form";
import DataTable from "../../views/customers/dataTable/DataTable";

const defaultValues = {
  search: "",
  status: "",
};

const Dealers = () => {
  const { control, watch } = useForm({
    defaultValues,
  });

  const [searchParams] = watch(["search"]);

  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable search={searchParams} />
    </Grid>
  );
};

Dealers.authGuard = true;
Dealers.guestGuard = false;

export default Dealers;
