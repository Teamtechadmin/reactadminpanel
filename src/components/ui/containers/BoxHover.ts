import { Box, BoxProps, styled } from "@mui/material";

export const BoxHover = styled(Box)<BoxProps>(() => ({
  "&:hover": {
    color: "#7367F0",
  },
  cursor: "pointer",
}));
