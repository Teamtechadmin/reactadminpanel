export interface LiveAuction {
  auctionID: string;
  carID: string;
  model: string;
  highestBid: string;
  startTime: Date;
  remainingTime: number;
  totalBidders: number;
  status: string;
}

export type LiveTabTypes = "auction" | "otb";
export type LiveAuctionStatus = "COMPLETED" | "LIVE" | "STOPPED" | "UPCOMING";

export type LiveStatusColor = {
  [key in LiveAuctionStatus]: string;
};

export interface LiveAuctionLog {
  id: number;
  dealershipID: string;
  dealershipName: string;
  phone: string;
  location: string;
  remainingTime: number;
  currentBid: number;
  bidType: string;
}

export interface ViewersAuctionLog {
  dealershipID: string;
  dealershipName: string;
  phone: string;
  location: string;
}
