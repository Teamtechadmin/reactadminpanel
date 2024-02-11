import { Tooltip, Typography } from "@mui/material";
import { BoxHover } from "./BoxHover";
import { MouseEventHandler } from "react";

export const ClickableTypography = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <Tooltip title={name} arrow>
      <BoxHover
        onClick={onClick}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography noWrap>{name}</Typography>
      </BoxHover>
    </Tooltip>
  );
};
