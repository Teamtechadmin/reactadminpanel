export type CarTabTypes = "car_details" | "documents";

export type CarAuctionOtbHandleTypes = "auction" | "otb";

export interface CarColumnProps {
  handleAuctionOtb: (id: string, type: CarAuctionOtbHandleTypes) => void;
}
