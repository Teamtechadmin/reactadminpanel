import { InfoRow } from "@/components/ui/utility/InfoRow";
import { LiveTabTypes } from "@/types/live/auctions";
import { calculateTimeDifference } from "@/utils/calculate-duration";
import { calculateRemainingTime } from "@/utils/calculate-remaining-time";
import { numberToINR } from "@/utils/convert-to-rs";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { Grid } from "@mui/material";

const getValues = (type: LiveTabTypes, data: any) => {
  console.log(data, "dataCheck");
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
    {
      label: "Date of Auction",
      value: data?.bidStartTime ? formatDateAndTime(data?.bidStartTime) : "-",
    },
    {
      label: "Duration of Auction",
      value:
        calculateTimeDifference(data?.bidStartTime, data?.bidEndTime) + " Mins",
    },
    {
      label: "Time Remaining",
      value: calculateRemainingTime(data?.bidStartTime, data?.bidEndTime),
      isCounter: true,
    },
  ];

  const otbValues = [
    {
      label: "Customer Expected Price",
      value: "₹ 1250000",
    },
    {
      label: "Date of OTB",
      value: "12-05-2024",
    },
    {
      label: "Duration of OTB",
      value: "30 minutes",
    },
    {
      label: "Time Remaining",
      value: "560000",
      isCounter: true,
    },
  ];

  return isAuction ? auctionValues : otbValues;
};

export const LogValues = ({
  type,
  data,
}: {
  type: LiveTabTypes;
  data: any;
}) => {
  const values = getValues(type, data);
  return (
    <Grid container display={"grid"} gridTemplateColumns={"1fr 1fr"}>
      {values.map(
        (
          item: { label: string; value: string | number; isCounter?: boolean },
          index,
        ) => {
          return (
            <InfoRow
              index={index}
              key={item.label}
              label={item.label}
              value={item.value}
              isCounter={Boolean(item.isCounter)}
            />
          );
        },
      )}
    </Grid>
  );
};
