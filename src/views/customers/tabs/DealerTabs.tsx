import TabList from "@/components/ui/tabs/TabList";
import { Grid } from "@mui/material";
import { useState } from "react";
import { DealerContent } from "../tabContents/new/DealerContent";

const dealerTabs = [
  {
    label: "Not Submitted",
    value: "not_submitted",
  },
  {
    label: "Submitted",
    value: "submitted",
  },
  {
    label: "Verified",
    value: "verified",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export const DealerTabs = () => {
  const [tabs, setTabs] = useState<string>(dealerTabs?.[0]?.value);
  return (
    <Grid marginTop={6}>
      <TabList value={tabs} setValue={setTabs} tabOptions={dealerTabs} />
      <DealerContent />
    </Grid>
  );
};
