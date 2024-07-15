import { useGetLiveAuctions } from "@/services/live/auctions/list/get";

interface Props {
  tab: string;
  params: { page: number; pageSize: number };
}
export const useGetLiveData = (props: Props) => {
  const { tab, params } = props;
  const isAuction = tab === "auction";
  const { data, isLoading } = useGetLiveAuctions({
    enabled: isAuction,
    ...params,
    status: "LIVE,SCHEDULED,COMPLETED,STOPPED",
  });

  return {
    data,
    isLoading,
  };
};
