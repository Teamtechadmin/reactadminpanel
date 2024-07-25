import { formatToAmount } from "@/utils/convert-to-rs";
import { SxProps, Typography } from "@mui/material";

export const AmountTypography = ({
  text,
  isHighlight,
  sx,
}: {
  text: string;
  isHighlight?: boolean;
  sx?: SxProps;
}) => {
  return (
    <Typography sx={sx} fontWeight={isHighlight ? 600 : 400}>
      {formatToAmount(text)}
    </Typography>
  );
};
