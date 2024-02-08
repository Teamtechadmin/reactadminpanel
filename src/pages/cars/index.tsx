import React from "react";
import SearchHeaders from "../customers/components/search/SearchHeaders";
import DataTable from "../cars/components/table/DataTable";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const Cars = () => {
  const { control } = useForm();
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DataTable />
    </Grid>
  );
};

export default Cars;
