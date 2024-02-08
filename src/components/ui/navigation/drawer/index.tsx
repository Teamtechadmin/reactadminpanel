// ** MUI Imports
import { styled, useTheme } from "@mui/material/styles";
import MuiSwipeableDrawer, {
  SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";

// ** Type Import
import { LayoutProps } from "../../../../layouts/types";
import { Theme, useMediaQuery } from "@mui/material";
import { useThemeStore } from "@/store/theme/store";

interface Props {
  navWidth: number;
  navHover: boolean;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps["hidden"];
  navigationBorderWidth: number;
  children: LayoutProps["children"];
  setNavHover: (values: boolean) => void;
  setNavVisible: (value: boolean) => void;
  navMenuProps: LayoutProps["verticalLayoutProps"]["navMenu"]["componentProps"];
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: "hidden",
  transition: "width .25s ease-in-out",
  "& ul": {
    listStyle: "none",
  },
  "& .MuiListItem-gutters": {
    paddingLeft: 4,
    paddingRight: 4,
  },
  "& .MuiDrawer-paper": {
    left: "unset",
    right: "unset",
    overflowX: "hidden",
    transition: "width .25s ease-in-out, box-shadow .25s ease-in-out",
  },
});

const Drawer = (props: Props) => {
  // ** Props
  const {
    children,
    navWidth,
    navMenuProps,
    setNavVisible,
    navigationBorderWidth,
  } = props;

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const { navVisible } = useThemeStore();

  // ** Hook
  const theme = useTheme();

  // let flag = true

  const drawerColors = () => {
    return {
      backgroundColor: "background.paper",
    };
  };

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true, // Better open performance on mobile.
    },
  };

  // Drawer Props for Laptop & Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      // Declared flag to resolve first time flicker issue while trying to collapse the menu
      // if (flag || navCollapsed) {
      //   setNavHover(true)
      //   flag = true
      // }
    },
    // onMouseLeave: () => {
    //   if (navCollapsed) {
    //     setNavHover(false);
    //   }
    // },
  };

  let userNavMenuStyle = {};
  let userNavMenuPaperStyle = {};
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx;
  }
  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx;
  }
  const userNavMenuProps = Object.assign({}, navMenuProps);
  delete userNavMenuProps.sx;
  delete userNavMenuProps.PaperProps;

  return (
    <SwipeableDrawer
      className="layout-vertical-nav"
      variant={hidden ? "temporary" : "permanent"}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{
        sx: {
          ...drawerColors(),
          boxShadow: 2,
          width: navWidth,
          borderRight:
            navigationBorderWidth === 0
              ? 0
              : `${navigationBorderWidth}px solid ${theme.palette.divider}`,
          ...userNavMenuPaperStyle,
        },
        ...navMenuProps?.PaperProps,
      }}
      sx={{
        width: navWidth,
        ...userNavMenuStyle,
      }}
      {...userNavMenuProps}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default Drawer;
