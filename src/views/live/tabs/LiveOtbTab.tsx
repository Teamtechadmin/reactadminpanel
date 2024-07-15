import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";

function LiveOtbTab() {
  const [openLog, setOpenLog] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openViews, setOpenViews] = useState(false);
  const [log, setLog] = useState<any>();
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

  const handleLog = (logItem: any) => {
    setLog(logItem);
    handleLogModal();
  };

  const handleStop = () => {
    setOpenStop(!openStop);
  };

  const handleViewers = (item: any) => {
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
        params={params}
        setParams={setParams}
      />
    </div>
  );
}

export default LiveOtbTab;
