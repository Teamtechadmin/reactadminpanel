import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { GET_AUCTION_RESULT } from "../endPoints";
import { UpdateResultProps } from "./types";

const updateResult = (props: UpdateResultProps) => {
  const { id, body } = props;
  return axiosInstance.patch(`${GET_AUCTION_RESULT}/${id}`, body);
};

export const useUpdateResult = () => {
  return useMutation({
    mutationFn: ({ id, body }: UpdateResultProps) =>
      updateResult({
        id,
        body,
      }),
  });
};
