import { useGetLiveAuctions } from "@/services/live/auctions/list/get";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import io from "socket.io-client";

interface Props {
  tab: string;
  params: { page: number; pageSize: number };
}
export const useGetLiveData = (props: Props) => {
  const { tab, params } = props;
  const isAuction = tab === "auction";
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetLiveAuctions({
    ...params,
    enabled: isAuction,
    status: "LIVE,SCHEDULED,COMPLETED,STOPPED",
  });

  useEffect(() => {
    socketInitializer();
  }, []);

  // Socket Implementation
  let socket;
  async function socketInitializer() {
    socket = io("wss://test.meracars.com/", { transports: ["websocket"] });
    socket.on("getLiveResult", (socketData: string) => {
      const data = JSON.parse(socketData);
      queryClient.setQueryData(["live-auctions"], () => {
        return data;
      });
    });
  }

  return {
    data,
    isLoading,
  };
};
