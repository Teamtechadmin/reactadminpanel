import { Grid } from "@mui/material";
import SearchHeaders from "../../searchHeader/SearchHeaders";
import { useForm } from "react-hook-form";
import { DealerDataGrid } from "./DealerDataGrid";

export const DealerContent = () => {
  const { control } = useForm();
  return (
    <Grid>
      <SearchHeaders control={control} />
      <DealerDataGrid />
    </Grid>
  );
};
