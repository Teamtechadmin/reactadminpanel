export type LiveTabTypes = "auction" | "otb";
export type LiveAuctionStatus = "COMPLETED" | "LIVE" | "STOPPED" | "SCHEDULED";

export type LiveStatusColor = {
  [key in LiveAuctionStatus]: string;
};

export interface LiveAuctionLog {
  amount: number;
  autoBidLimit: number;
  userId: string;
  uniqueId: string;
  isAutobid: boolean;
  contactNo: number;
  isRejected: boolean;
  fullname: string;
  district: string;
  type: string;
  _id: string;
  id: string;
}

export interface ViewersAuctionLog {
  userId: string;
  uniqueId: string;
  contactNo: number;
  fullname: string;
  district: string;
  _id: string;
}

export interface LiveOtbLog {
  amount: number;
  userId: string;
  uniqueId: string;
  isAutobid: boolean;
  contactNo: number;
  fullname: string;
  district: string;
  isRejected: boolean;
  type: string;
  _id: string;
  id: string;
}

export interface AuctionLiveFilterParams {
  searchText: string;
  status: string;
}
