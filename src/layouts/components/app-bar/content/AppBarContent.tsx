// ** MUI Imports
import UserDropdown from "@/components/ui/custom/user/UserDropdown";
import Icon from "@/components/ui/icon";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import NotificationDropdown from "../notifications/Notifications";

export type AppBarContentProps = {
  hidden: boolean;
  toggleNavVisibility: () => void;
};

const AppBarContent = (props: AppBarContentProps) => {
  const { hidden, toggleNavVisibility } = props;
  const notifications = [
    {
      title: "Notification",
      subtitle: "This is notification",
    },
    {
      title: "Notification",
      subtitle: "This is notification",
    },
    {
      title: "Notification",
      subtitle: "This is notification",
    },
    {
      title: "Notification",
      subtitle: "This is notification",
    },
  ];

  return (
    <Box
      className="appBar"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: hidden ? "space-between" : "end",
      }}
    >
      {hidden ? (
        <IconButton
          color="inherit"
          sx={{ ml: -2.75 }}
          onClick={toggleNavVisibility}
        >
          <Icon fontSize="1.5rem" icon="tabler:menu-2" />
        </IconButton>
      ) : null}
      <NotificationDropdown notifications={notifications} />
      <UserDropdown />
    </Box>
  );
};

export default AppBarContent;
