import { Grid, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

const CenteredGrid = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      sx={{ ...sx }}
    >
      {children}
    </Grid>
  );
};

export default CenteredGrid;
