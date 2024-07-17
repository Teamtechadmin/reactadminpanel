import { useGetLiveAuctions } from "@/services/live/auctions/list/get";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Props {
  tab: string;
  params: { page: number; pageSize: number };
}

export const useGetLiveData = (props: Props) => {
  const { tab, params } = props;
  const isAuction = tab === "auction";
  const [live, setLive] = useState<any>([]);

  const { data, isLoading, isFetched } = useGetLiveAuctions({
    ...params,
    enabled: isAuction,
    status: "LIVE,SCHEDULED,COMPLETED,STOPPED",
  });

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (isFetched) {
      setLive(data?.data);
    }
  }, [isFetched]);

  // Socket Implementation
  let socket;
  async function socketInitializer() {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? "", {
      transports: ["websocket"],
    });
    socket.on("getLiveResult", (socketData: string) => {
      try {
        const data = JSON.parse(socketData);
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
