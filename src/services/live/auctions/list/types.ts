export interface LiveAuctionResponse {
  status: string;
  message: string;
  data: LiveAuctionItem[];
  count: number;
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}

export interface LiveAuctionItem {
  _id: string;
  auctionId: string;
  OTBId: string;
  uniqueId: number;
  carId: string;
  model: string;
  highestBid: number;
  totalBidder: number;
  bidStartTime: string;
  bidEndTime: string;
  realValue?: number;
  status: string;
  leaderBoard: (LeaderBoard | LeaderBoard2)[];
  viewerList: (ViewerList | ViewerList2 | ViewerList3)[];
}

interface ViewerList3 {
  userId: string;
  contactNo: number;
  _id: string;
  fullname?: string;
  district?: string;
}

interface ViewerList2 {
  userId: string;
  contactNo: number;
  _id: string;
}

interface ViewerList {
  userId: string;
  contactNo: number;
  fullname: string;
  district: string;
  _id: string;
}

interface LeaderBoard2 {
  amount: number;
  userId: string;
  uniqueId: string;
  isAutobid: boolean;
  contactNo: number;
  fullname?: string;
  district?: string;
  isRejected: boolean;
  type: string;
  _id: string;
}

interface LeaderBoard {
  amount: number;
  userId: string;
  uniqueId: string;
  isAutobid: boolean;
  contactNo: number;
  isRejected: boolean;
  type: string;
  _id: string;
}
