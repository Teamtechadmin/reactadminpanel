import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GET_EVALUATORS_ALL } from "./endpoints";
import { axiosInstance } from "@/axios/axiosInstance";
import { EvaluatorObject } from "./types";

interface PageParams {
  page: number;
  pageSize: number;
}

async function getCarEvaluators(
  params: PageParams,
): Promise<AxiosResponse<EvaluatorObject>> {
  const filterParams = {
    page: params.page,
    limit: params.pageSize,
  };

  const response = await axiosInstance.get(GET_EVALUATORS_ALL, {
    params: filterParams,
  });

  return response;
}

export const useGetAllEvaluators = (params: PageParams) => {
  return useQuery({
    queryKey: ["evaluators-all"],
    queryFn: () => getCarEvaluators(params),
    staleTime: Infinity,
  });
};
