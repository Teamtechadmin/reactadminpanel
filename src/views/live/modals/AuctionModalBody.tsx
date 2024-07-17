import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { BidChips } from "./bagdge/BidChips";
import BiddingField from "@/components/ui/inputfields/BiddingField";
import useCustomToast from "@/utils/toast";
import { numberToINR } from "@/utils/convert-to-rs";
import { calculateRemainingTime } from "@/utils/calculate-remaining-time";
import ButtonSpinner from "@/components/ui/spinner/button";

interface Props {
  handleAdminBid: (amount: number) => void;
  log: any;
  disableBid: boolean;
}

const bidRates = [
  {
    title: "+ ₹2000",
    value: 2000,
  },
  {
    title: "+ ₹5000",
    value: 5000,
  },
  {
    title: "+ ₹10000",
    value: 10000,
  },
  {
    title: "+ ₹15000",
    value: 15000,
  },
];

export default function AuctionModalBody(props: Props) {
  const { log, handleAdminBid, disableBid } = props;
  const currentBid = log?.highestBid ?? 0;
  const stepRate = 2000 ?? 0;
  const [value, setValue] = useState(currentBid);
  const toast = useCustomToast();

  const handleBidChip = (amount: number) => {
    setValue(Number(value ?? 0) + Number(amount ?? 0));
  };
  const handleBid = () => {
    if (stepRate + currentBid <= Number(value)) {
      handleAdminBid(value);
    } else {
      toast.error(
        "Bid Amount should not be less than sum of current bid and step rate",
      );
    }
  };
  return (
    <Grid display={"flex"} gap={4} padding={3}>
      <Grid>
        {log?.front?.url ? (
          <Image src={log?.front?.url} width={411} height={319} alt="Car" />
        ) : (
          <Grid width={411} height={319}></Grid>
        )}
      </Grid>
      <Grid width={"100%"} paddingX={2}>
        <Typography
          sx={{ backgroundColor: "#dfdfdf", display: "inline" }}
          fontSize={12}
          fontWeight={500}
          padding={0.5}
          borderRadius={1}
        >
          ID {log?.uniqueId}
        </Typography>
        <Grid display={"flex"} flexDirection={"column"} gap={2} paddingY={2}>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Current Bid:</Typography>
            <Typography fontWeight={600} color={"Highlight"}>
              {numberToINR(currentBid)}
            </Typography>
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Step Rate:</Typography>
            <Typography>{numberToINR(stepRate)}</Typography>
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Time Remaining:</Typography>
            <Typography>
              <Countdown
                date={
                  Date.now() +
                  Number(
                    calculateRemainingTime(log?.bidStartTime, log?.bidEndTime),
                  )
                }
                intervalDelay={1000}
                precision={0}
                renderer={({ hours, minutes, seconds }) => {
                  const pad = (n: number) => String(n).padStart(2, "0");
                  return (
                    <div>{`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}</div>
                  );
                }}
              />
            </Typography>
          </Grid>
          <BiddingField
            value={value}
            setValue={setValue}
            currentBid={currentBid}
            stepRate={stepRate}
          />
          <Grid display={"flex"} justifyContent={"space-between"} gap={2}>
            {bidRates?.map((bid) => {
              return (
                <BidChips
                  key={bid.title}
                  title={bid.title}
                  onClick={() => handleBidChip(bid.value)}
                />
              );
            })}
          </Grid>
          <Button
            disabled={disableBid}
            sx={{ mt: 0.5 }}
            onClick={handleBid}
            variant="contained"
          >
            {disableBid ? <ButtonSpinner /> : "Place Bid"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
