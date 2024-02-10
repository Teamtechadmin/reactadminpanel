import { Grid } from "@mui/material";
import React from "react";
import SearchHeaders from "../customers/components/search/SearchHeaders";
import { useForm } from "react-hook-form";
import DataTable from "./components/table/DataTable";

const Auctions = () => {
  const { control } = useForm();
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable />
    </Grid>
  );
};

Auctions.authGuard = true;
Auctions.guestGuard = false;

export default Auctions;
