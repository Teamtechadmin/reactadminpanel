import { formatToAmount } from "@/utils/convert-to-rs";
import { Typography } from "@mui/material";

export const AmountTypography = ({ text }: { text: string }) => {
  return <Typography>{formatToAmount(text)}</Typography>;
};
