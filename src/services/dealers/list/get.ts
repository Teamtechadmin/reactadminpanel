import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GET_DEALERS } from "../endpoints";
import { AxiosResponse } from "axios";
import { DealerDataObj } from "./types";

interface DealerParams {
  pageSize: number;
  page: number;
  sortKey?: "createdAt" | "name";
  sortValue?: 1 | -1;
  contactNo?: number;
  isDocumentsVerified?: string;
}

export const getDealers = async (
  params: DealerParams,
): Promise<AxiosResponse<DealerDataObj>> => {
  const filterParams = {
    page: params?.page + 1,
    limit: params?.pageSize,
    isDocumentsVerified: params?.isDocumentsVerified,
  };
  return await axiosInstance.get(GET_DEALERS, {
    params: filterParams,
  });
};

export const useGetDealers = ({ params }: { params: DealerParams }) => {
  return useQuery({
    queryKey: ["dealers", params],
    queryFn: () => getDealers(params),
  });
};
