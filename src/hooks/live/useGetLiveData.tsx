import { useGetLiveAuctions } from "@/services/live/auctions/list/get";
import { useGetLiveOtb } from "@/services/live/otb/list/get";
import { AuctionLiveFilterParams } from "@/types/live/auctions";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Props {
  tab: string;
  params: { page: number; pageSize: number };
  filterParams: AuctionLiveFilterParams;
}

export const useGetLiveData = (props: Props) => {
  const { tab, params, filterParams } = props;
  const { searchText, status } = filterParams;
  const [live, setLive] = useState<any>([]);

  const isAuction = tab === "auction";
  const isOtb = tab === "otb";

  const {
    data: auctionData,
    isLoading: isAuctionLoading,
    isFetching: isAuctionFetching,
    isFetched: isAuctionFetched,
  } = useGetLiveAuctions({
    ...params,
    enabled: isAuction,
    status: status ?? "LIVE,SCHEDULED,COMPLETED,STOPPED",
    uniqueId: searchText,
  });

  const {
    data: otbData,
    isFetching: isOtbFetching,
    isFetched: isOtbFetched,
    isLoading: isOtbLoading,
  } = useGetLiveOtb({
    ...params,
    enabled: isOtb,
    status: status ?? "OTB,OTB_SCHEDULED,STOPPED,COMPLETED",
    uniqueId: searchText,
  });

  const { data, isFetching, isFetched, isLoading } = isAuction
    ? {
        data: auctionData,
        isFetching: isAuctionFetching,
        isFetched: isAuctionFetched,
        isLoading: isAuctionLoading,
      }
    : {
        data: otbData,
        isFetching: isOtbFetching,
        isFetched: isOtbFetched,
        isLoading: isOtbLoading,
      };

  const socketKey = isAuction ? "getLiveResult" : "getLiveOTBResult";

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (isFetched) {
      setLive(data?.data);
    }
  }, [isFetching]);

  // Socket Implementation
  let socket;
  async function socketInitializer() {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? "", {
      transports: ["websocket"],
    });
    socket.on(socketKey, (socketData: string) => {
      try {
        const data = JSON.parse(socketData);
        console.log("hitting loop");
        setLive(data);
      } catch (e) {
        console.error("Invalid JSON string", e);
      }
    });
  }
  return {
    data: { data: live, count: data?.count },
    isLoading,
  };
};
