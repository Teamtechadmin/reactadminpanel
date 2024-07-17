import { useGetLiveAuctions } from "@/services/live/auctions/list/get";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Props {
  tab: string;
  params: { page: number; pageSize: number };
  searchText: string;
}

export const useGetLiveData = (props: Props) => {
  const { tab, params, searchText } = props;
  const isAuction = tab === "auction";
  const [live, setLive] = useState<any>([]);

  const { data, isLoading, isFetching, isFetched } = useGetLiveAuctions({
    ...params,
    enabled: isAuction,
    status: "LIVE,SCHEDULED,COMPLETED,STOPPED",
    uniqueId: searchText,
  });

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
    socket.on("getLiveResult", (socketData: string) => {
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
