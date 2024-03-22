import SelectFormField from "@/components/ui/inputfields/SelectField";
import { InputAdornment, MenuItem } from "@mui/material";
import React from "react";
import { Control, UseFormSetValue } from "react-hook-form";

const selectBy = [
  {
    id: "uniqueId",
    name: "Unique Id",
  },
  { id: "regNum", name: "Reg. No." },
];

function renderItem(obj: { id: string; name: string }) {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.name}
    </MenuItem>
  );
}

interface Props {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

const SearchByDropDown = (props: Props) => {
  const { control, setValue } = props;
  return (
    <InputAdornment position="end">
      <SelectFormField
        control={control}
        id="searchBy"
        renderMenuItems={renderItem}
        data={selectBy}
        handleOnChange={() => setValue("search", "")}
      />
    </InputAdornment>
  );
};

export default SearchByDropDown;
