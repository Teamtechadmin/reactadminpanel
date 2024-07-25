import DataTable from "../../views/cars/dataTable/DataTable";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import SearchHeaders from "@/views/cars/search/SearchHeader";
import { useState } from "react";

const defaultValues = {
  searchBy: "uniqueId",
  search: "",
};

const Cars = () => {
  const { control, watch, setValue } = useForm({
    defaultValues,
  });
  const [search, searchBy] = watch(["search", "searchBy"]);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const params = { search, createdAt, searchBy, status };

  return (
    <Grid>
      <SearchHeaders
        control={control}
        setDate={setCreatedAt}
        setValue={setValue}
        setStatus={setStatus}
      />
      <DataTable control={control} postQueryParams={params} />
    </Grid>
  );
};

Cars.authGuard = true;
Cars.guestGuard = false;

export default Cars;
