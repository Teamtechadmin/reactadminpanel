import { Grid, MenuItem } from "@mui/material";
import React from "react";
import TextFormField from "../../../components/ui/inputfields/TextFormField";
import SelectFormField from "../../../components/ui/inputfields/SelectField";
import { Control } from "react-hook-form";

interface SearchHeaderProps {
  control: Control<any>;
  customLabel?: string;
}

const statusData = [
  {
    name: "Live",
    id: "LIVE",
  },
  {
    name: "Upcoming",
    id: "UPCOMING",
  },
  {
    name: "Completed",
    id: "COMPLETED",
  },
  {
    name: "Stopped",
    id: "STOPPED",
  },
];

function renderItem(obj: { id: string; name: string }) {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.name}
    </MenuItem>
  );
}

const SearchHeaders = (props: SearchHeaderProps) => {
  const { control, customLabel } = props;
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      paddingY={4}
    >
      <Grid item xl={4}>
        <TextFormField
          control={control}
          id="search"
          label={customLabel ? customLabel : "Search"}
          placeholder="Input Search Text"
          fillWhite
        />
      </Grid>
      <Grid item xl={2} md={2} xs={4}>
        <SelectFormField
          control={control}
          id="status"
          renderMenuItems={renderItem}
          data={statusData}
          label="Status"
          labelSize="small"
          fillWhite
        />
      </Grid>
    </Grid>
  );
};

export default SearchHeaders;
