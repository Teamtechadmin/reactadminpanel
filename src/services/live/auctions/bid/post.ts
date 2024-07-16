import { axiosInstance } from "@/axios/axiosInstance";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { BID_AUCTION } from "../../endpoints";
import { AuctionBidBody } from "./types";

export const useAuctionBid = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  AuctionBidBody,
  unknown
> => {
  return useMutation({
    mutationFn: (values: any) => {
      return axiosInstance.post(BID_AUCTION, values);
    },
  });
};
