import { InfoRow } from "@/components/ui/utility/InfoRow";
import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";

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
      {values.map((item, index) => {
        return (
          <InfoRow
            index={index}
            key={item.label}
            label={item.label}
            value={item.value}
          />
        );
      })}
    </Grid>
  );
};
