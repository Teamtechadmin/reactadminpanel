// ** React Import
import { useRef, useState } from "react";

// ** MUI Imports
import List from "@mui/material/List";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Type Import
import { LayoutProps } from "../../../layouts/types";

// ** Component Imports
import Drawer from "./drawer/index";

// ** Util Import
import VerticalNavItems from "@/layouts/components/VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";
import { hexToRGBA } from "@/utils/hex-to-rgba";
import themeConfig from "@/configs/theme/themeConfig";

interface Props {
  navWidth: number;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps["hidden"];
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  children: LayoutProps["children"];
  setNavVisible: (value: boolean) => void;
  navMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["content"];
  navMenuBranding: LayoutProps["verticalLayoutProps"]["navMenu"]["branding"];
  menuLockedIcon: LayoutProps["verticalLayoutProps"]["navMenu"]["lockedIcon"];
  verticalNavItems: LayoutProps["verticalLayoutProps"]["navMenu"]["navItems"];
  navMenuProps: LayoutProps["verticalLayoutProps"]["navMenu"]["componentProps"];
  menuUnlockedIcon: LayoutProps["verticalLayoutProps"]["navMenu"]["unlockedIcon"];
  afterNavMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["afterContent"];
  beforeNavMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["beforeContent"];
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  height: theme.mixins.toolbar.minHeight,
  transition: "opacity .15s ease-in-out",
  "&.scrolled": {
    opacity: 1,
  },
}));

const Navigation = (props: Props) => {
  // ** Props
  const {
    hidden,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    navMenuContent: userNavMenuContent,
  } = props;

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false);
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Hooks
  const theme = useTheme();

  // ** Var
  const {
    afterVerticalNavMenuContentPosition,
    beforeVerticalNavMenuContentPosition,
  } = themeConfig;

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-expect-error: ''
      ref._getBoundingClientRect = ref.getBoundingClientRect;

      ref.getBoundingClientRect = () => {
        // @ts-expect-error: ''
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };

  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    if (
      beforeVerticalNavMenuContentPosition === "static" ||
      !beforeNavMenuContent
    ) {
      container = hidden ? container.target : container;
      if (shadowRef && container.scrollTop > 0) {
        // @ts-expect-error: ''
        if (!shadowRef.current.classList.contains("scrolled")) {
          // @ts-expect-error: ''
          shadowRef.current.classList.add("scrolled");
        }
      } else {
        // @ts-expect-error: ''
        shadowRef.current.classList.remove("scrolled");
      }
    }
  };

  const shadowBgColor = () => {
    return `linear-gradient(${theme.palette.background.paper} 5%,${hexToRGBA(
      theme.palette.background.paper,
      0.85,
    )} 30%,${hexToRGBA(theme.palette.background.paper, 0.5)} 65%,${hexToRGBA(
      theme.palette.background.paper,
      0.3,
    )} 75%,transparent)`;
  };

  const ScrollWrapper: any = hidden ? Box : PerfectScrollbar;
  return (
    <Drawer
      {...props}
      navHover={navHover}
      setNavHover={setNavHover}
      navigationBorderWidth={navigationBorderWidth}
    >
      <VerticalNavHeader />
      {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === "fixed"
        ? beforeNavMenuContent(props)
        : null}
      {(beforeVerticalNavMenuContentPosition === "static" ||
        !beforeNavMenuContent) && (
        <StyledBoxForShadow
          ref={shadowRef}
          sx={{ background: shadowBgColor(), display: "none" }}
        />
      )}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <ScrollWrapper
          {...(hidden
            ? {
                onScroll: (container: any) => scrollMenu(container),
                sx: { height: "100%", overflowY: "auto", overflowX: "hidden" },
              }
            : {
                options: { wheelPropagation: false },
                onScrollY: (container: any) => scrollMenu(container),
                containerRef: (ref: any) => handleInfiniteScroll(ref),
              })}
        >
          {beforeNavMenuContent &&
          beforeVerticalNavMenuContentPosition === "static"
            ? beforeNavMenuContent(props)
            : null}
          {userNavMenuContent ? (
            userNavMenuContent(props)
          ) : (
            <List
              className="nav-items"
              sx={{ pt: 2, "& > :first-of-type": { mt: "0" } }}
            >
              <VerticalNavItems
                navHover={navHover}
                groupActive={groupActive}
                setGroupActive={setGroupActive}
                currentActiveGroup={currentActiveGroup}
                setCurrentActiveGroup={setCurrentActiveGroup}
                {...props}
              />
            </List>
          )}
          {afterNavMenuContent &&
          afterVerticalNavMenuContentPosition === "static"
            ? afterNavMenuContent(props)
            : null}
        </ScrollWrapper>
      </Box>
      {afterNavMenuContent && afterVerticalNavMenuContentPosition === "fixed"
        ? afterNavMenuContent(props)
        : null}
    </Drawer>
  );
};

export default Navigation;
