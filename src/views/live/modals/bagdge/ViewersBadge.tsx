import IconifyIcon from "@/components/ui/icon";
import { Grid, Typography } from "@mui/material";

export const ViewersBadge = () => {
  return (
    <Grid
      sx={{ backgroundColor: "#dfdfdf" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={2}
      gap={1}
      padding={1}
    >
      <IconifyIcon icon={"tabler:eye"} color="GrayText" />
      <Typography align="right" color={"GrayText"}>
        People Watching (10)
      </Typography>
    </Grid>
  );
};
