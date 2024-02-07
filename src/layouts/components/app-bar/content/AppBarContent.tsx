// ** MUI Imports
import UserDropdown from "@/components/ui/custom/user/UserDropdown";
import Box from "@mui/material/Box";

const AppBarContent = () => {
  return (
    <Box
      className="appBar"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home{" "}
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs> */}
      <UserDropdown />
    </Box>
  );
};

export default AppBarContent;
