import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import { LiveAuction } from "@/types/live/auctions";

function LiveAuctionTab() {
  const [openLog, setOpenLog] = useState(false);
  const [log, setLog] = useState<LiveAuction>();

  const handleLogModal = () => {
    setOpenLog(!openLog);
  };

  const handleLog = (logItem: LiveAuction) => {
    setLog(logItem);
    handleLogModal();
  };
  const columns = useColumns({
    handleLog,
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
      />
    </div>
  );
}

export default LiveAuctionTab;
