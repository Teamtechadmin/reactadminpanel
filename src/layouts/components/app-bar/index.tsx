// ** MUI Imports
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";

// ** Type Imports
import { LayoutProps } from "../../types";

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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(() => ({
  width: "100%",
  backgroundColor: "#FFFFFF",
}));

const LayoutAppBar = (props: Props) => {
  const appBar = "fixed";
  // ** Props
  const { appBarProps, appBarContent: userAppBarContent } = props;

  const userAppBarProps = Object.assign({}, appBarProps);
  delete userAppBarProps.sx;

  return (
    <Toolbar>
      <AppBar
        elevation={0}
        color="default"
        className="layout-navbar"
        position={appBar === "fixed" ? "sticky" : "static"}
        sx={{ maxHeight: 10 }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
      </AppBar>
    </Toolbar>
  );
};

export default LayoutAppBar;
