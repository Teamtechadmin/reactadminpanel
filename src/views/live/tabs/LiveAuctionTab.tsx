import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import { LiveAuction } from "@/types/live/auctions";
import AuctionBidModal from "../modals/AuctionBidModal";

function LiveAuctionTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [openBid, setOpenBid] = useState(false);

  const [log, setLog] = useState<LiveAuction>();

  const handleLogModal = () => {
    setOpenLog(!openLog);
  };

  const handleViewersModal = () => {
    setOpenViews(!openViews);
  };

  const handleBidModal = () => {
    setOpenBid(!openBid);
  };

  const handleLog = (logItem: LiveAuction) => {
    setLog(logItem);
    handleLogModal();
  };

  const handleStop = () => {
    setOpenStop(!openStop);
  };

  const handleViewers = (item: LiveAuction) => {
    setLog(item);
    setOpenViews(!openViews);
  };

  const handleBid = (item: LiveAuction) => {
    handleBidModal();
    setLog(item);
    setOpenBid(!openBid);
  };

  const columns = useColumns({
    handleLog,
    handleStop,
    handleViewers,
    handleBid,
    type: "auction",
  });

  return (
    <div>
      <LiveFeed
        columns={columns}
        data={liveAuctions}
        type="auction"
        handleClose={handleLogModal}
        openLog={openLog}
        log={log}
        handleStop={handleStop}
        openStop={openStop}
        openViews={openViews}
        handleViewers={handleViewersModal}
      />
      <AuctionBidModal
        handleClose={handleBidModal}
        log={log}
        openBid={openBid}
      />
    </div>
  );
}

export default LiveAuctionTab;
