import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import AuctionBidModal from "../modals/AuctionBidModal";
import { LiveAuctionItem } from "@/services/live/auctions/list/types";
import { useGetLiveData } from "@/hooks/live/useGetLiveData";

function LiveAuctionTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [openBid, setOpenBid] = useState(false);
  const [log, setLog] = useState<LiveAuctionItem>();
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleLogModal = () => {
    setOpenLog(!openLog);
  };

  const handleViewersModal = () => {
    setOpenViews(!openViews);
  };

  const handleBidModal = () => {
    setOpenBid(!openBid);
  };

  const handleLog = (logItem: LiveAuctionItem) => {
    setLog(logItem);
    handleLogModal();
  };

  const handleStop = () => {
    setOpenStop(!openStop);
  };

  const handleViewers = (item: LiveAuctionItem) => {
    setLog(item);
    setOpenViews(!openViews);
  };

  const handleBid = (item: LiveAuctionItem) => {
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

  const { data, isLoading } = useGetLiveData({
    params,
    tab: "auction",
  });

  return (
    <div>
      <LiveFeed
        columns={columns}
        data={data?.data ?? ([] as any)}
        type="auction"
        handleClose={handleLogModal}
        openLog={openLog}
        log={log}
        handleStop={handleStop}
        openStop={openStop}
        openViews={openViews}
        handleViewers={handleViewersModal}
        params={params}
        setParams={setParams}
        isFetching={isLoading}
        rowCount={data?.count ?? 100}
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
