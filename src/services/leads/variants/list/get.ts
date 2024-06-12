import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GET_VARIANTS } from "./endpoints";
import { VariantObject } from "./types";

async function getCarVariants(params: {
  modelID: number;
  year: string;
}): Promise<AxiosResponse<VariantObject>> {
  const filterParams = {
    model: params?.modelID,
    make_year: params?.year,
    page_size: 100,
    page: 1,
    is_public: true,
    sell_page_filter: true,
  };

  const response = await axios.get(GET_VARIANTS, {
    params: filterParams,
  });

  return response;
}

export const useGetVariants = (params: { modelID: number; year: string }) => {
  return useQuery({
    queryKey: ["variants", params],
    queryFn: () => getCarVariants(params),
    staleTime: Infinity,
    enabled: Boolean(params?.modelID) && Boolean(params?.year),
  });
};
