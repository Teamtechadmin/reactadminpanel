import { InfoRow } from "@/components/ui/utility/InfoRow";
import { LiveTabTypes } from "@/types/live/auctions";
import { numberToINR } from "@/utils/convert-to-rs";
import { Grid } from "@mui/material";

const getValues = (type: LiveTabTypes, data: any) => {
  const isAuction = type === "auction";
  const auctionValues = [
    {
      label: "Fair Market Value",
      value: numberToINR(data?.realValue ?? 0),
    },
    {
      label: "Customer Expected Price",
      value: data?.customerPrice ? numberToINR(data?.customerPrice ?? 0) : "-",
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

export const ViewerLogValues = ({
  type,
  data,
}: {
  type: LiveTabTypes;
  data: any;
}) => {
  const values = getValues(type, data);

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
