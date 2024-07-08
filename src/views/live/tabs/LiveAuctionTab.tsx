import { liveAuctions } from "@/dummy/live-autions";
import { useColumns } from "@/hooks/columns/live-auctions";
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import { LiveAuction } from "@/types/live/auctions";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import { Button, Grid, Typography } from "@mui/material";

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
      />
      <ConfirmModal
        dailogueTitle="Confirmation Needed"
        titleFont={20}
        handleClose={handleStop}
        open={openStop}
        icon="tabler:ban"
        iconSize={22}
        ContentComponent={
          <Grid padding={3}>
            <Typography fontWeight={500}>
              {" "}
              Do you really want to stop the auction? Clicking on Proceed will
              end the auction!
            </Typography>
            <Grid
              display={"flex"}
              justifyContent={"end"}
              gap={2}
              paddingTop={2}
            >
              <Button onClick={handleStop} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button onClick={handleStop} variant="contained" color="error">
                Proceed
              </Button>
            </Grid>
          </Grid>
        }
      />
    </div>
  );
}

export default LiveAuctionTab;
