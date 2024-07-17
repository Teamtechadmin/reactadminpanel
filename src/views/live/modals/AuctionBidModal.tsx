import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import React from "react";
import AuctionModalBody from "./AuctionModalBody";

interface Props {
  logId: string;
  data: any;
  handleClose: () => void;
  openBid: boolean;
  handleBid: (amount: number) => void;
  disableBid: boolean;
}

function AuctionBidModal(props: Props) {
  const { logId, handleClose, openBid, data, handleBid, disableBid } = props;
  const log = data?.find((item: { id: string }) => item.id === logId);
  const dailogueTitle = log?.model;
  return (
    <CustomDialogue
      ComponentContent={
        <AuctionModalBody
          log={log}
          handleAdminBid={handleBid}
          disableBid={disableBid}
        />
      }
      dailogueTitle={dailogueTitle}
      handleClose={handleClose}
      icon=""
      maxWidth="md"
      open={openBid}
      titleFont={20}
      titleWeight={600}
    />
  );
}

export default AuctionBidModal;
