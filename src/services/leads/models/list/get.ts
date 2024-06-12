import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GET_MODELS } from "./endpoints";
import { ModelObject } from "./types";

async function getCarModels(params: {
  makeID: number;
  year: string;
}): Promise<AxiosResponse<ModelObject>> {
  const filterParams = {
    popular_count: 3,
    make_id: params?.makeID,
    page: 1,
    page_size: 100,
    is_public: true,
    fields: "id,name,display_name,is_usable,logo",
    remove_from_other: true,
    city_name: "mumbai",
    make_year: params?.year,
  };

  const response = await axios.get(GET_MODELS, {
    params: filterParams,
  });

  return response;
}

export const useGetModels = (params: { makeID: number; year: string }) => {
  return useQuery({
    queryKey: ["models", params],
    queryFn: () => getCarModels(params),
    staleTime: Infinity,
    enabled: Boolean(params?.makeID) && Boolean(params?.year),
  });
};
