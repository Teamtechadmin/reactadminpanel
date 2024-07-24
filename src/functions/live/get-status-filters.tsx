import { LiveTabTypes } from "@/types/live/auctions";

export const getStatusFilters = (tab: LiveTabTypes) => {
  const isAuction = tab === "auction";
  return isAuction
    ? [
        {
          name: "All",
          id: null,
        },
        {
          name: "Live",
          id: "LIVE",
        },
        {
          name: "Scheduled",
          id: "SCHEDULED",
        },
        {
          name: "Completed",
          id: "COMPLETED",
        },
        {
          name: "Stopped",
          id: "STOPPED",
        },
      ]
    : [
        {
          name: "All",
          id: null,
        },
        {
          name: "OTB",
          id: "OTB",
        },
        {
          name: "Scheduled",
          id: "OTB_SCHEDULED",
        },
        {
          name: "Completed",
          id: "OTB_COMPLETED",
        },
        {
          name: "Stopped",
          id: "OTB_STOPPED",
        },
      ];
};
