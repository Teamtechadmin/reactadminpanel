import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactNode } from "react";
import { styled } from "@mui/material/styles";

type MenuIconProps = {
  children: ReactNode;
} & SvgIconProps;

const MenuIconStyled = styled(SvgIcon)(() => ({
  "& svg": {
    fill: "#CDD2D6",
  },
  "&.active svg, &:hover svg": {
    fill: "#1877F2",
  },
}));

export const MenuIcon = ({ children, ...props }: MenuIconProps) => {
  return <MenuIconStyled {...props}>{children}</MenuIconStyled>;
};
