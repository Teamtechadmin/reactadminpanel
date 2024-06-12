import { MenuItem } from "@mui/material";

export function renderItem(obj: { id: string; name: string }) {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.name}
    </MenuItem>
  );
}

export const renderMenuItems = (item: { label: string; value: string }) => (
  <MenuItem value={item.value}>{item.label}</MenuItem>
);
