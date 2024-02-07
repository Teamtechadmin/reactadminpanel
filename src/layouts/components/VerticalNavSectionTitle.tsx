// ** MUI Imports
import { styled } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiListSubheader, {
  ListSubheaderProps,
} from "@mui/material/ListSubheader";
import { NavSectionTitle } from "../types";
import CanViewNavSectionTitle from "@/components/acl/CanViewNavSectionTitle";

interface Props {
  navHover: boolean;
  item: NavSectionTitle;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
}

// ** Styled Components
const ListSubheader = styled((props: ListSubheaderProps) => (
  <MuiListSubheader component="li" {...props} />
))(({ theme }) => ({
  lineHeight: 1,
  display: "flex",
  position: "static",
  marginTop: theme.spacing(3.5),
  paddingTop: theme.spacing(1.5),
  backgroundColor: "transparent",
  paddingBottom: theme.spacing(1.5),
  transition: "padding-left .25s ease-in-out",
}));

const TypographyHeaderText = styled(Typography)<TypographyProps>({
  fontSize: "0.75rem",
  lineHeight: "normal",
  letterSpacing: "0.21px",
  textTransform: "uppercase",
});

const VerticalNavSectionTitle = (props: Props) => {
  // ** Props
  const { item, collapsedNavWidth, navigationBorderWidth } = props;
  const navCollapsed = true;

  return (
    <CanViewNavSectionTitle navTitle={item}>
      <ListSubheader
        className="nav-section-title"
        sx={{
          ...(navCollapsed
            ? {
                py: 0.5,
                px: (collapsedNavWidth - navigationBorderWidth - 22) / 8,
              }
            : { px: 7.5 }),
          "& .MuiTypography-root, & svg": {
            color: () => "text.disabled",
          },
        }}
      >
        <TypographyHeaderText noWrap>{item.sectionTitle}</TypographyHeaderText>
      </ListSubheader>
    </CanViewNavSectionTitle>
  );
};

export default VerticalNavSectionTitle;
