import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import React from "react";
import AuctionModalBody from "./AuctionModalBody";

interface Props {
  log: any;
  handleClose: () => void;
  openBid: boolean;
}

function AuctionBidModal(props: Props) {
  const { log, handleClose, openBid } = props;
  const dailogueTitle = log?.model;
  return (
    <CustomDialogue
      ComponentContent={<AuctionModalBody handleClose={handleClose} />}
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
