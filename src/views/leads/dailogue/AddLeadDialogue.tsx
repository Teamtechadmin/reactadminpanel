import CustomDialogue from "@/components/ui/dialogue/AuctionDailogue";
import React, { SetStateAction } from "react";
import AddLeadDialogueBody from "./body/AddLeadDialogueBody";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function AddLeadDialogue(props: Props) {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(!open);
  return (
    <CustomDialogue
      open={open}
      handleClose={handleClose}
      dailogueTitle="Add New Lead"
      icon="tabler:users-group"
      maxWidth="md"
      titleFont={18}
      ComponentContent={<AddLeadDialogueBody handleClose={handleClose} />}
      titleWeight={600}
      iconSize="1.25rem"
    />
  );
}
