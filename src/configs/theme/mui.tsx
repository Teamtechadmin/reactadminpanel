import { createTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1890FF",
    },
    secondary: {
      main: "#dfdfdf",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: "#FAFAFA",
        },
      },
    },
  },
});
