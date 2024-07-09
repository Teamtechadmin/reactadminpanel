import { Chip, ChipProps, styled } from "@mui/material";

interface Props {
  onClick: () => void;
  title: string;
}

const CustomChip = styled(Chip)<ChipProps>(() => ({
  backgroundColor: "#E7F3FF",
  color: "Highlight",
  borderRadius: 4,
}));

export const BidChips = (props: Props) => {
  const { onClick, title } = props;
  return <CustomChip label={title} onClick={onClick} />;
};
