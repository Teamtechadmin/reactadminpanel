import { Box, BoxProps, styled } from "@mui/material";

export const BoxHover = styled(Box)<BoxProps>(() => ({
  "&:hover": {
    color: "#1890FF",
  },
  cursor: "pointer",
}));
