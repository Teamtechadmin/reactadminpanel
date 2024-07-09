import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Duster from "../../../../public/assets/duster.png";
import Image from "next/image";
import Countdown from "react-countdown";
import { BidChips } from "./bagdge/BidChips";
import BiddingField from "@/components/ui/inputfields/BiddingField";
import useCustomToast from "@/utils/toast";

interface Props {
  handleClose: () => void;
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
  const { handleClose } = props;
  const currentBid = 201000;
  const stepRate = 2000;

  const [value, setValue] = useState(201000);
  const toast = useCustomToast();

  const handleBidChip = (amount: number) => {
    setValue(Number(value ?? 0) + Number(amount ?? 0));
  };
  const handleBid = () => {
    if (stepRate + currentBid <= Number(value)) {
      toast.success("Bid placed successfully");
      handleClose();
    } else {
      toast.error(
        "Bid Amount should not be less than sum of current bid and step rate",
      );
    }
  };
  return (
    <Grid display={"flex"} gap={4} padding={3}>
      <Grid>
        <Image src={Duster} alt="Car" />
      </Grid>
      <Grid width={"100%"} paddingX={2}>
        <Typography
          sx={{ backgroundColor: "#dfdfdf", display: "inline" }}
          fontSize={12}
          fontWeight={500}
          padding={0.5}
          borderRadius={1}
        >
          ID #1234567890
        </Typography>
        <Grid display={"flex"} flexDirection={"column"} gap={2} paddingY={2}>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Current Bid:</Typography>
            <Typography fontWeight={600} color={"Highlight"}>
              ₹201000
            </Typography>
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Current Bid:</Typography>
            <Typography>₹2000</Typography>
          </Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography>Time Remaining:</Typography>
            <Typography>
              <Countdown
                date={Date.now() + Number(300000)}
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
          <Button sx={{ mt: 0.5 }} onClick={handleBid} variant="contained">
            Place Bid
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
