import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GET_AUCTION_RESULT } from "../endPoints";
import { AxiosResponse } from "axios";
import { AuctionRoot } from "./types";

async function getAuctionResult(): Promise<AxiosResponse<AuctionRoot>> {
  const filterParams = {
    status: "NEGOTIATION,DEAL_LOST",
  };

  const response = await axiosInstance.get(GET_AUCTION_RESULT, {
    params: filterParams,
  });

  return response.data;
}

export const useGetAuctionResults = () => {
  return useQuery({
    queryKey: ["auction-result"],
    queryFn: () => getAuctionResult(),
  });
};
