import { useState, SyntheticEvent, Fragment, ReactNode } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiMenu, { MenuProps } from "@mui/material/Menu";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Grid, Tooltip } from "@mui/material";
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
      padding: theme.spacing(2, 3),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
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

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const { auth } = useAuthStore();
  const userID = auth?.user?._id;

  const { data: notifications } = useGetNotifications({
    id: userID,
    isFCMSuccess: true,
  });
  const notificationList = notifications?.data?.data ?? [];

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
          invisible={notificationList && !notificationList?.length}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
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
              label={notificationList ? `${notificationList?.length ?? 0}` : ""}
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
          {notificationList ? (
            notificationList?.map((notification: any, index: number) => {
              return (
                <MenuItem
                  key={index}
                  disableRipple
                  disableTouchRipple
                  onClick={handleDropdownClose}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
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
                      <Tooltip title={notification.title}>
                        <MenuItemTitle>{notification.title}</MenuItemTitle>
                      </Tooltip>
                      <Tooltip title={notification.body}>
                        <MenuItemSubtitle variant="body2">
                          {notification.body}
                        </MenuItemSubtitle>
                      </Tooltip>
                    </Box>
                  </Box>
                </MenuItem>
              );
            })
          ) : (
            <Grid display={"flex"} justifyContent={"center"}></Grid>
          )}
        </ScrollWrapper>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
