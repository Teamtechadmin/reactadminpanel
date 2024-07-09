import { Grid, Typography } from "@mui/material";

export const InfoRow = ({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) => (
  <Grid
    display="flex"
    paddingY={1}
    justifyContent={index % 2 === 0 ? "start" : "end"}
  >
    <Typography fontWeight={600} marginRight={1}>
      {label}:
    </Typography>
    <Typography>{value}</Typography>
  </Grid>
);
