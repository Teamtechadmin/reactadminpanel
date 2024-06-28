import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GET_NOTIFICATIONS } from "./endpoints";
import { NotifyParams } from "./types";

async function getNotifications(params: NotifyParams) {
  const response = await axiosInstance.get(GET_NOTIFICATIONS + "/" + params.id);

  return response;
}

export const useGetNotifications = (params: NotifyParams) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => getNotifications(params),
    enabled: Boolean(params?.id) && Boolean(params?.isFCMSuccess),
  });
};
