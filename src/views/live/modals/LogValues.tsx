import { LiveTabTypes } from "@/types/live/auctions";
import { Grid, Typography } from "@mui/material";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Grid display="flex" paddingY={1}>
    <Typography fontWeight={600} marginRight={1}>
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Grid>
);

const getValues = (type: LiveTabTypes) => {
  const isAuction = type === "auction";
  const auctionValues = [
    {
      label: "Fair Market Value",
      value: "Rs 1250000",
    },
    {
      label: "Customer Expected Price",
      value: "Rs 1250000",
    },
    {
      label: "Date of Auction",
      value: "12-05-2024",
    },
    {
      label: "Duration of Auction",
      value: "30 minutes",
    },
  ];

  const otbValues = [
    {
      label: "Customer Expected Price",
      value: "Rs 1250000",
    },
    {
      label: "Date of OTB",
      value: "12-05-2024",
    },
    {
      label: "Duration of OTB",
      value: "30 minutes",
    },
  ];

  return isAuction ? auctionValues : otbValues;
};

export const LogValues = ({ type }: { type: LiveTabTypes }) => {
  const values = getValues(type);
  return (
    <Grid container display={"grid"} gridTemplateColumns={"1fr 1fr"}>
      {values.map((item) => {
        return (
          <InfoRow key={item.label} label={item.label} value={item.value} />
        );
      })}
    </Grid>
  );
};
