import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { GET_CARS_ENDPOINT } from "../endpoints";
import { CarParams } from "./types";
import { firstCapsOnly } from "@/utils/capitalise-firstletter";

const getSearchParam = (params: any, key: string) => {
  const value = params?.search;
  if (params?.searchBy === key && value !== "") {
    const capitalisedSearchParam = key === "fuelType" || key === "transmission";
    return capitalisedSearchParam ? firstCapsOnly(value) : value;
  }
};

async function getCars(params: CarParams) {
  const filterParams = {
    page: params.page + 1,
    limit: params.pageSize,
    sortKey: "createdAt",
    sortValue: -1,
    status: params?.status || null,
    uniqueId: getSearchParam(params, "uniqueId"),
    make: getSearchParam(params, "make"),
    model: getSearchParam(params, "model"),
    fuelType: getSearchParam(params, "fuelType"),
    transmission: getSearchParam(params, "transmission"),
  };

  const response = await axiosInstance.get(GET_CARS_ENDPOINT, {
    params: filterParams,
  });

  return response;
}

export const useGetCars = ({ params }: { params: CarParams }) => {
  return useQuery({
    queryKey: ["cars", params],
    queryFn: () => getCars(params),
  });
};
