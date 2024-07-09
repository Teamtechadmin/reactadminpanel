import { InfoRow } from "@/components/ui/utility/InfoRow";
import { LiveTabTypes } from "@/types/live/auctions";
import { Grid } from "@mui/material";

const getValues = (type: LiveTabTypes) => {
  const isAuction = type === "auction";
  const auctionValues = [
    {
      label: "Fair Market Value",
      value: "₹ 1250000",
    },
    {
      label: "Customer Expected Price",
      value: "₹ 1250000",
    },
  ];

  const otbValues = [
    {
      label: "Customer Expected Price",
      value: "₹ 1250000",
    },
  ];

  return isAuction ? auctionValues : otbValues;
};

export const ViewerLogValues = ({ type }: { type: LiveTabTypes }) => {
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
