import { CarData, CarDataSearchParams } from "@/services/cars/list/types";
import { localiseDate } from "@/utils/localise-date";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { SetStateAction, useDeferredValue, useEffect } from "react";

interface PostSearchCars {
  search: string;
  setCarPostData: React.Dispatch<SetStateAction<CarData[]>>;
  postSearch: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    CarDataSearchParams,
    unknown
  >;
  setCount: React.Dispatch<SetStateAction<number>>;
  createdAt?: Date | null;
}

const usePostSearchCars = (props: PostSearchCars) => {
  const { search, setCarPostData, postSearch, createdAt, setCount } = props;
  const deferredSearch = useDeferredValue<string>(search);

  useEffect(() => {
    if (
      (deferredSearch !== undefined && search) ||
      (createdAt !== undefined && createdAt)
    ) {
      postSearch.mutate(
        {
          lastFourDigits: deferredSearch || null,
          createdAt: localiseDate(createdAt),
        },
        {
          onSuccess: (res: { data: { data: CarData[]; count: number } }) => {
            setCarPostData(res.data.data);
            setCount(res.data.count);
          },
        },
      );
    }
  }, [deferredSearch, createdAt]);
};

export default usePostSearchCars;
