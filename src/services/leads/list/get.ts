import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GET_LEADS } from "./endpoints";
import { GetLeadParams, LeadObject } from "./types";

async function getLeads(
  params: GetLeadParams,
): Promise<AxiosResponse<LeadObject>> {
  const filterParams = {
    page: params.page + 1,
    limit: params.pageSize,
    status: params.status,
  };

  const response = await axiosInstance.get(GET_LEADS, {
    params: filterParams,
  });

  return response;
}

export const useGetLeads = ({ params }: { params: GetLeadParams }) => {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: () => getLeads(params),
  });
};
