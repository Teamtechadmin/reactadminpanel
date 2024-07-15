import { useEffect } from "react";
import io from "socket.io-client";

export const useGetLiveAuctionData = () => {
  // const queryClient = useQueryClient();
  useEffect(() => {
    socketInitializer();
  }, []);

  // Socket Implementation
  let socket;
  async function socketInitializer() {
    socket = io("wss://test.meracars.com/", { transports: ["websocket"] });
    socket.on("getLiveResult", (socketData) => {
      console.log(socketData, "socketData");
      // const data = JSON.parse(socketData);
      // queryClient.setQueryData("live-auctions", (oldData) => {
      //   const update = (entity) =>
      //     entity.id === data.id ? { ...entity, ...data.payload } : entity;
      //   return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
      // });
    });
  }
};
