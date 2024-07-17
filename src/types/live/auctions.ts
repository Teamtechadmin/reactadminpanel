export type LiveTabTypes = "auction" | "otb";
export type LiveAuctionStatus = "COMPLETED" | "LIVE" | "STOPPED" | "SCHEDULED";

export type LiveStatusColor = {
  [key in LiveAuctionStatus]: string;
};

export interface LiveAuctionLog {
  amount: number;
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
  id: number;
  dealershipID: string;
  dealershipName: string;
  phone: string;
  location: string;
  remainingTime: number;
  quote: number;
}
