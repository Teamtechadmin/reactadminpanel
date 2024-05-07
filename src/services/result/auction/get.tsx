import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GET_AUCTION_RESULT } from "../endPoints";
import { AxiosResponse } from "axios";
import { AuctionRoot } from "./types";

interface AuctionsParams {
  page: number;
  pageSize: number;
  status: string;
}

async function getAuctionResult(
  params: AuctionsParams,
): Promise<AxiosResponse<AuctionRoot>> {
  const filterParams = {
    status: params.status,
    page: params.page + 1,
    limit: params.pageSize,
  };

  const response = await axiosInstance.get(GET_AUCTION_RESULT, {
    params: filterParams,
  });

  return response.data;
}

export const useGetAuctionResults = (params: AuctionsParams) => {
  return useQuery({
    queryKey: ["auction-result", params],
    queryFn: () => getAuctionResult(params),
  });
};
