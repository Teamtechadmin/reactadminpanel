import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GET_BRANDS } from "./endpoints";
import { BrandsObject } from "./types";

async function getCarBrands(): Promise<AxiosResponse<BrandsObject>> {
  const filterParams = {
    popular_count: 11,
  };

  const response = await axios.get(GET_BRANDS, {
    params: filterParams,
  });

  return response;
}

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getCarBrands(),
    staleTime: Infinity,
  });
};
