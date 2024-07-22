import { axiosInstance } from "@/axios/axiosInstance";
import { AxiosResponse } from "axios";
import { GET_OTB_LIVE } from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { LiveOtbResponse } from "./types";

interface OtbParams {
  page: number;
  pageSize: number;
  status: string;
  enabled: boolean;
  uniqueId: string;
}

async function getLiveOtb(
  params: OtbParams,
): Promise<AxiosResponse<LiveOtbResponse>> {
  const filterParams = {
    page: params.page + 1,
    limit: params.pageSize,
    status: params.status,
    uniqueId: params.uniqueId,
  };

  const response = await axiosInstance.get(GET_OTB_LIVE, {
    params: filterParams,
  });

  return response;
}

export const useGetLiveOtb = (params: OtbParams) => {
  return useQuery({
    queryKey: ["live-otb", params],
    queryFn: () => getLiveOtb(params),
    enabled: Boolean(params.enabled),
    select: (data) => {
      const idData = data?.data?.data?.map((item) => {
        return {
          ...item,
          id: item._id,
        };
      });
      return {
        data: idData,
        count: data?.data?.count,
      };
    },
  });
};
