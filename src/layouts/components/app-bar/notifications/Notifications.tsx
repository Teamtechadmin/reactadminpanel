import {
  useState,
  SyntheticEvent,
  Fragment,
  ReactNode,
  useEffect,
} from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiMenu, { MenuProps } from "@mui/material/Menu";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Grid } from "@mui/material";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "../../../../firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { useSetFCM } from "@/services/notification/post/post";
import { useAuthStore } from "@/store/auth/store";
import { useGetNotifications } from "@/services/notification/get/get";

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4.5),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
    "& .MuiMenuItem-root": {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 500,
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ maxHeight: 349, overflowY: "auto", overflowX: "hidden" }}>
      {children}
    </Box>
  );
};

const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );
  const [fcmSuccess, setFcmSuccess] = useState(false);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const { auth } = useAuthStore();
  const userID = auth?.user?._id;

  const setFCM = useSetFCM();
  const { data: notifications } = useGetNotifications({
    id: userID,
    isFCMSuccess: fcmSuccess,
  });

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Messaging service
    const messaging = getMessaging(app);

    async function requestPermission() {
      //requesting permission using Notification API
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID,
        });

        if (userID) {
          setFCM.mutate(
            {
              body: {
                fcmToken: token,
                platform: "WEB",
              },
              id: userID,
            },
            {
              onSuccess: () => setFcmSuccess(true),
              onError: () => setFcmSuccess(false),
            },
          );
        }

        console.log("Token generated : ", token);
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }
    requestPermission();
  }, [userID]);

  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge
          color="error"
          variant="dot"
          invisible={notifications && !notifications.data?.length}
          sx={{
            "& .MuiBadge-badge": {
              top: 4,
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        >
          <Icon fontSize="1.5rem" icon="tabler:bell" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            cursor: "default",
            userSelect: "auto",
            backgroundColor: "transparent !important",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ cursor: "text", fontWeight: 600 }}>
              Notifications
            </Typography>
            <Chip
              className={"MuiChip-light"}
              color="primary"
              label={notifications ? `${notifications?.data?.length} New` : ""}
              sx={{
                height: 20,
                fontSize: "0.75rem",
                fontWeight: 500,
                borderRadius: "10px",
              }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications ? (
            notifications?.data?.map((notification: any, index: number) => (
              <MenuItem
                key={index}
                disableRipple
                disableTouchRipple
                onClick={handleDropdownClose}
              >
                <Box
                  sx={{ width: "100%", display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      mr: 4,
                      ml: 2.5,
                      flex: "1 1",
                      display: "flex",
                      overflow: "hidden",
                      flexDirection: "column",
                    }}
                  >
                    <MenuItemTitle>{notification.title}</MenuItemTitle>
                    <MenuItemSubtitle variant="body2">
                      {notification.subtitle}
                    </MenuItemSubtitle>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.disabled" }}>
                    {notification.meta}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <Grid display={"flex"} justifyContent={"center"}></Grid>
          )}
        </ScrollWrapper>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
