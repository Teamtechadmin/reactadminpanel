import { axiosInstance } from "@/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GET_EVALUATORS_ENDPOINT } from "../evaluators/endpoints";
import { UserRoles } from "./type";

interface GetUserParams {
  page: number;
  pageSize: number;
  role: UserRoles;
}

async function getUsers(params: GetUserParams): Promise<AxiosResponse<any>> {
  const filterParams = {
    page: params.page + 1,
    limit: params.pageSize,
    role: params.role,
  };

  const response = await axiosInstance.get(GET_EVALUATORS_ENDPOINT, {
    params: filterParams,
  });

  return response;
}

export const useGetUsers = ({ params }: { params: GetUserParams }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};
