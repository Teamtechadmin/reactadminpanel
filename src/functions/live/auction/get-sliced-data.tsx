interface Props {
  page: number;
  pageSize: number;
  liveAuctions: any[];
  searchText: string;
}
export const getSlicedData = (props: Props) => {
  const { liveAuctions, page, pageSize, searchText } = props;
  const from = (page - 1) * pageSize;
  const to = from + (pageSize - 1);

  if (liveAuctions?.length <= 10) {
    return liveAuctions;
  } else if (liveAuctions?.length > 10 && searchText && searchText !== "") {
    return liveAuctions
      ?.filter(
        (item: { uniqueId: number }) => item.uniqueId === Number(searchText),
      )
      ?.slice(from, to + 1);
  } else {
    return liveAuctions?.slice(from, to + 1);
  }
};
