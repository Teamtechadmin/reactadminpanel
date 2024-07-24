import TabList from "@/components/ui/tabs/TabList";
import { LiveTabTypes } from "@/types/live/auctions";
import SearchHeaders from "@/views/live/header/searchHeader";
import LiveAuctionTab from "@/views/live/tabs/LiveAuctionTab";
import LiveOtbTab from "@/views/live/tabs/LiveOtbTab";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const tabs = [
  {
    label: "Auctions",
    value: "auction",
  },
  {
    label: "OTB",
    value: "otb",
  },
];

function LiveHome() {
  const [tabValue, setTabValue] = useState(tabs[0].value);
  const [refresh, setRefresh] = useState(0);
  const { control, watch, setValue } = useForm();
  const [search, status] = watch(["search", "status"]);
  const filterParams = { searchText: search, status };

  const tabComponents = {
    auction: <LiveAuctionTab filterParams={filterParams} />,
    otb: <LiveOtbTab filterParams={filterParams} />,
  };

  function handleTabChange() {
    setValue("status", null);
    setRefresh(refresh + 1);
  }

  return (
    <div>
      <TabList
        tabOptions={tabs}
        value={tabValue}
        setValue={setTabValue}
        handleTabChange={handleTabChange}
      />
      <SearchHeaders
        tab={tabValue as LiveTabTypes}
        control={control}
        customLabel="Search by Car ID"
        key={`id_${refresh}`}
      />
      <Grid mt={1}>{tabComponents[tabValue as LiveTabTypes]}</Grid>
    </div>
  );
}

export default LiveHome;
