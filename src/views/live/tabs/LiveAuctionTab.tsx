import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import AuctionBidModal from "../modals/AuctionBidModal";
import { LiveAuctionItem } from "@/services/live/auctions/list/types";
import { useGetLiveData } from "@/hooks/live/useGetLiveData";
import useUpdateCarById from "@/hooks/actions/cars/update-car";
import useCustomToast from "@/utils/toast";
import { useAuctionBid } from "@/services/live/auctions/bid/post";
import { errorMessageParser } from "@/utils/error";

function LiveAuctionTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [openBid, setOpenBid] = useState(false);
  const [stopId, setStopId] = useState<string>("");
  const [log, setLog] = useState<LiveAuctionItem>();
  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const update = useUpdateCarById();
  const bid = useAuctionBid();
  const toast = useCustomToast();

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

  const handleStopModal = () => {
    setOpenStop(!openStop);
  };

  const handleStop = (id: string) => {
    handleStopModal();
    setStopId(id);
  };

  const handleStopProceed = () => {
    update({
      body: {
        status: "STOPPED",
      },
      id: stopId,
      handleSuccess: () => {
        handleStop("");
        toast.success("Auction Stopped Successfully!!");
      },
    });
  };

  const handleViewers = (item: LiveAuctionItem) => {
    setLog(item);
    setOpenViews(!openViews);
  };

  const handleBid = (item: LiveAuctionItem) => {
    handleBidModal();
    setLog(item);
  };

  const handleAdminBid = (amount: number) => {
    bid.mutate(
      {
        amount,
        carId: log?.carId ?? "",
      },
      {
        onSuccess: () => {
          toast.success("Bid Placed Successfully");
          handleBidModal();
        },
        onError: (err) => toast.error(errorMessageParser(err)),
      },
    );
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
        handleStop={handleStopModal}
        openStop={openStop}
        openViews={openViews}
        handleViewers={handleViewersModal}
        params={params}
        setParams={setParams}
        isFetching={isLoading}
        rowCount={data?.count ?? 10000}
        handleStopProceed={handleStopProceed}
      />
      <AuctionBidModal
        handleClose={handleBidModal}
        handleBid={handleAdminBid}
        data={data?.data ?? []}
        logId={log?._id ?? ""}
        openBid={openBid}
      />
    </div>
  );
}

export default LiveAuctionTab;
