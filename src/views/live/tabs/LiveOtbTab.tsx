import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import { LiveAuction } from "@/types/live/auctions";

function LiveOtbTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openViews, setOpenViews] = useState(false);

  const [log, setLog] = useState<LiveAuction>();

  const handleLogModal = () => {
    setOpenLog(!openLog);
  };

  const handleViewersModal = () => {
    setOpenViews(!openViews);
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

  const columns = useColumns({
    handleLog,
    handleStop,
    handleViewers,
    type: "otb",
  });

  return (
    <div>
      <LiveFeed
        columns={columns}
        data={liveAuctions}
        type="otb"
        handleClose={handleLogModal}
        openLog={openLog}
        log={log}
        handleStop={handleStop}
        openStop={openStop}
        openViews={openViews}
        handleViewers={handleViewersModal}
      />
    </div>
  );
}

export default LiveOtbTab;
