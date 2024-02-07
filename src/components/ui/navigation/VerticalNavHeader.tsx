// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Configs
import themeConfig from "@/configs/theme/themeConfig";

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
  backgroundColor: "#001529",
}));

// eslint-disable-next-line no-empty-pattern
const HeaderTitle = styled(Typography)<TypographyProps>(({}) => ({
  fontWeight: 800,
  lineHeight: "24px",
  fontSize: "1.375rem !important",
  color: `white !important`,
  transition: "opacity .25s ease-in-out, margin .25s ease-in-out",
}));

const LinkStyled = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const VerticalNavHeader = () => {
  const menuCollapsedStyles = { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    return 4.5;
  };

  const conditionalColors = () => {
    return {
      "& .MuiTypography-root, & .MuiIconButton-root": {
        color: "text.primary",
      },
    };
  };

  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ pl: menuHeaderPaddingLeft(), ...conditionalColors(), mb: -2 }}
    >
      <LinkStyled
        sx={{
          display: "flex",
          justifyContent: "center",
          marginX: "auto",
        }}
        href="/"
      >
        <HeaderTitle
          variant="h6"
          sx={{
            ...menuCollapsedStyles,
          }}
        >
          {themeConfig.name}
        </HeaderTitle>
      </LinkStyled>
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
