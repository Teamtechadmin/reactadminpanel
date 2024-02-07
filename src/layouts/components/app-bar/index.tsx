// ** MUI Imports
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";

// ** Type Imports
import { LayoutProps } from "../../types";
import { hexToRGBA } from "@/utils/hex-to-rgba";

// ** Util Import

interface Props {
  hidden: LayoutProps["hidden"];
  toggleNavVisibility: () => void;
  appBarContent: NonNullable<
    LayoutProps["verticalLayoutProps"]["appBar"]
  >["content"];
  appBarProps: NonNullable<
    LayoutProps["verticalLayoutProps"]["appBar"]
  >["componentProps"];
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(0, 6)} !important`,
}));

const LayoutAppBar = (props: Props) => {
  const appBar = "fixed";
  const appBarBlur = false;
  // ** Props
  const { appBarProps, appBarContent: userAppBarContent } = props;
  // ** Vars

  //   const appBarBlurEffect = appBarBlur && {
  //     "&:after": {
  //       top: 0,
  //       left: 0,
  //       zIndex: -1,
  //       width: "100%",
  //       content: '""',
  //       position: "absolute",
  //       backdropFilter: "blur(10px)",
  //       height: (theme: Theme) =>
  //         `calc(${theme.mixins.toolbar.minHeight as number}px + ${theme.spacing(4)})`,
  //       mask: (theme: Theme) =>
  //         `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default} 18%, transparent 100%)`,
  //       background: (theme: Theme) =>
  //         `linear-gradient(180deg,${hexToRGBA(theme.palette.background.default, 0.7)} 44%, ${hexToRGBA(
  //           theme.palette.background.default,
  //           0.43,
  //         )} 73%, ${hexToRGBA(theme.palette.background.default, 0)})`,
  //     },
  //   };

  let userAppBarStyle = {};
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx;
  }
  const userAppBarProps = Object.assign({}, appBarProps);
  delete userAppBarProps.sx;

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      sx={{ ...userAppBarStyle }}
      position={appBar === "fixed" ? "sticky" : "static"}
      {...userAppBarProps}
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          minHeight: (theme) =>
            `${theme.mixins.toolbar.minHeight as number}px !important`,
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
          boxShadow: 1,
          "@media (min-width:1440px)": {
            maxWidth: (theme) => `calc(1440px - ${theme.spacing(6 * 2)})`,
          },
        }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
