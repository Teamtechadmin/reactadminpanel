import { AuctionLiveFilterParams } from "@/types/live/auctions";

interface Props {
  page: number;
  pageSize: number;
  liveAuctions: any[];
  filterParams: AuctionLiveFilterParams;
}
export const getSlicedData = (props: Props) => {
  const { liveAuctions, page, pageSize, filterParams } = props;
  const { searchText, status } = filterParams;
  const from = (page - 1) * pageSize;
  const to = from + (pageSize - 1);
  const hasSearch = searchText && searchText !== "";
  const hasFilters = hasSearch || status;

  if (liveAuctions?.length <= 10) {
    return liveAuctions;
  } else if (liveAuctions?.length > 10 && hasFilters) {
    let filteredData = liveAuctions;
    if (hasSearch) {
      filteredData = filteredData?.filter(
        (item: { uniqueId: number }) => item.uniqueId === Number(searchText),
      );
    }
    if (status) {
      filteredData = filteredData?.filter(
        (item: { status: string }) => item.status === status,
      );
    }
    return filteredData?.slice(from, to + 1);
  } else {
    return liveAuctions?.slice(from, to + 1);
  }
};
