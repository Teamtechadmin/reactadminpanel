import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import { LiveAuction } from "@/types/live/auctions";

function LiveAuctionTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [log, setLog] = useState<LiveAuction>();

  const handleLogModal = () => {
    setOpenLog(!openLog);
  };

  const handleLog = (logItem: LiveAuction) => {
    setLog(logItem);
    handleLogModal();
  };

  const handleStop = () => {
    setOpenStop(!openStop);
  };

  const columns = useColumns({
    handleLog,
    handleStop,
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
      />
    </div>
  );
}

export default LiveAuctionTab;
