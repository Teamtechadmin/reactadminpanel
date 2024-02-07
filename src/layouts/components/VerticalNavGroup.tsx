// ** React Imports
import { useEffect, Fragment } from "react";
// ** Next Import
import { useRouter } from "next/router";
// ** MUI Imports
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import Icon from "../../components/ui/icon";
import { hasActiveChild, removeChildren } from "../utils";
// ** Type Import
import { NavGroup } from "../types";
// ** Custom Components Imports
import VerticalNavItems from "./VerticalNavItems";
import themeConfig from "@/configs/theme/themeConfig";
import { MenuIcon } from "@/components/ui/icon/menu";
import IconifyIcon from "../../components/ui/icon";
import CanViewNavGroup from "@/components/acl/CanViewNavGroup";

interface Props {
  item: NavGroup;
  navHover: boolean;
  parent?: NavGroup;
  navVisible?: boolean;
  groupActive: string[];
  collapsedNavWidth: number;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  isSubToSub?: NavGroup | undefined;
  setGroupActive: (values: string[]) => void;
  setCurrentActiveGroup: (items: string[]) => void;
}

const MenuItemTextWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  overflow: "hidden",
}));

const VerticalNavGroup = (props: Props) => {
  // ** Props
  const {
    item,
    parent,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup,
  } = props;

  // ** Hooks & Vars
  const theme = useTheme();
  const router = useRouter();
  const currentURL = router.asPath;

  // ** Accordion menu group open toggle
  const toggleActiveGroup = (item: NavGroup, parent: NavGroup | undefined) => {
    let openGroup = groupActive;

    // ** If Group is already open and clicked, close the group
    if (openGroup.includes(item.title)) {
      openGroup.splice(openGroup.indexOf(item.title), 1);

      // If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup);
      }
    } else if (parent) {
      // ** If Group clicked is the child of an open group, first remove all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup);
      }

      // ** After removing all the open groups under that parent, add the clicked group to open group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    } else {
      // ** If clicked on another group that is not active or open, create openGroup array from scratch

      // ** Empty Open Group array
      openGroup = [];

      // ** push Current Active Group To Open Group array
      if (currentActiveGroup.every((elem) => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup);
      }

      // ** Push current clicked group item to Open Group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    }
    setGroupActive([...openGroup]);
  };

  // ** Menu Group Click
  const handleGroupClick = () => {
    toggleActiveGroup(item, parent);
  };

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.title)) groupActive.push(item.title);
    } else {
      const index = groupActive.indexOf(item.title);
      if (index > -1) groupActive.splice(index, 1);
    }
    setGroupActive([...groupActive]);
    setCurrentActiveGroup([...groupActive]);

    // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
    if (!navHover) {
      setGroupActive([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (!navHover) {
      setGroupActive([]);
    }

    if (groupActive.length === 0) {
      setGroupActive([...currentActiveGroup]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  useEffect(() => {
    if (groupActive.length === 0) {
      setGroupActive([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const menuGroupCollapsedStyles = { opacity: 1 };

  const conditionalColors = () => {
    return {
      "& .MuiTypography-root, & :not(.menu-item-meta) > svg": {
        color: "text.secondary",
      },
      "&.Mui-selected": {
        backgroundColor: "action.hover",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        "& .MuiTypography-root, & :not(.menu-item-meta) > svg": {
          color: "text.primary",
        },
        "& .menu-item-meta > svg": {
          color: "text.secondary",
        },
      },
    };
  };

  return (
    <CanViewNavGroup navGroup={item}>
      <Fragment>
        <ListItem
          disablePadding
          className="nav-group"
          onClick={handleGroupClick}
          sx={{ mt: 1, px: "0 !important", flexDirection: "column" }}
        >
          <ListItemButton
            // className={{
            //   "Mui-selected":
            //     groupActive.includes(item.title) ||
            //     currentActiveGroup.includes(item.title),
            // }}
            sx={{
              py: 2,
              mx: 3.5,
              borderRadius: 1,
              ...conditionalColors(),
              width: `calc(100% - ${theme.spacing(3.5 * 2)})`,
              transition:
                "padding-left .25s ease-in-out, padding-right .25s ease-in-out",
              px: 4,
              "&.Mui-selected.Mui-focusVisible": {
                backgroundColor: "action.focus",
                "&:hover": {
                  backgroundColor: "action.focus",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                transition: "margin .25s ease-in-out",
                // ...(parent && navCollapsed && !navHover ? {} : { mr: 2 }),
                // ...(navCollapsed && !navHover ? { mr: 0 } : {}), // this condition should come after (parent && navCollapsed && !navHover) condition for proper styling
                ...(parent && item.children ? { ml: 1.5, mr: 3.5 } : {}),
              }}
            >
              {/* {navCollapsed && !navHover && ( */}
              {/* <UserIcon icon={icon as string} {...(parent && { fontSize: '0.625rem' })} /> */}
              {/* )} */}
              {/* <HomeIcon /> */}

              {typeof item.icon === "string" ? (
                <IconifyIcon
                  icon={icon as string}
                  {...(parent && { fontSize: "0.625rem" })}
                />
              ) : (
                <MenuIcon
                  width={26}
                  height={26}
                  className={
                    groupActive.includes(item.title) ||
                    currentActiveGroup.includes(item.title)
                      ? "active"
                      : ""
                  }
                >
                  {item.icon}
                </MenuIcon>
              )}
            </ListItemIcon>
            <MenuItemTextWrapper
              sx={{
                ...menuGroupCollapsedStyles,
                ...(isSubToSub ? { ml: 2 } : {}),
              }}
            >
              <Typography noWrap fontWeight={600} fontSize={14}>
                {item.title}
              </Typography>
              <Box
                className="menu-item-meta"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& svg": {
                    transition: "transform .25s ease-in-out",
                    color:
                      // mode === "semi-dark"
                      //   ? `rgba(${theme.palette.customColors.dark}, 0.38)`
                      "text.disabled",
                    ...(groupActive.includes(item.title) && {
                      transform: "rotate(90deg)",
                    }),
                  },
                }}
              >
                {item.badgeContent ? (
                  <Chip
                    label={item.badgeContent}
                    color={item.badgeColor || "primary"}
                    sx={{
                      mr: 1.5,
                      height: 20,
                      fontWeight: 500,
                      "& .MuiChip-label": {
                        px: 1.5,
                        textTransform: "capitalize",
                      },
                    }}
                  />
                ) : null}
                <Icon fontSize="1.125rem" icon={"tabler:chevron-right"} />
              </Box>
            </MenuItemTextWrapper>
          </ListItemButton>
          <Collapse
            component="ul"
            onClick={(e) => e.stopPropagation()}
            in={groupActive.includes(item.title)}
            sx={{
              pl: 0,
              width: "100%",
              ...menuGroupCollapsedStyles,
              transition: "all 0.25s ease-in-out",
            }}
          >
            <VerticalNavItems
              {...props}
              parent={item}
              navVisible={navVisible}
              verticalNavItems={item.children}
              isSubToSub={parent && item.children ? item : undefined}
            />
          </Collapse>
        </ListItem>
      </Fragment>
    </CanViewNavGroup>
  );
};

export default VerticalNavGroup;
