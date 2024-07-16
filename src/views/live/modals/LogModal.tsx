import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import LogModalBody from "./LogModalBody";
import { LiveTabTypes } from "@/types/live/auctions";

interface Props {
  openLog: boolean;
  handleClose: () => void;
  type: LiveTabTypes;
  log: any;
}

export const LogModal = (props: Props) => {
  const { handleClose, openLog, log, type } = props;
  const dailogueTitle = `${log?.model}` + " " + "(Live LOG)";
  return (
    <CustomDialogue
      ComponentContent={<LogModalBody type={type} data={log} />}
      dailogueTitle={dailogueTitle}
      handleClose={handleClose}
      icon=""
      maxWidth="md"
      open={openLog}
      titleFont={20}
      titleWeight={600}
    />
  );
};
