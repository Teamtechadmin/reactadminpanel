export interface LiveOtbResponse {
  status: string;
  message: string;
  data: LiveOtbResponseData[];
  count: number;
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}

export interface LiveOtbResponseData {
  _id: string;
  OTBId: string;
  auctionId: string;
  uniqueId: number;
  carId: string;
  model: string;
  highestBid: number;
  totalBidder: number;
  bidStartTime: string;
  bidEndTime: string;
  realValue?: number;
  front: Front;
  customerPrice: string;
  status: string;
  leaderBoard: LeaderBoard[];
  viewerList: ViewerList[];
  createdAt: string;
}

interface ViewerList {
  userId: string;
  uniqueId: string;
  contactNo: number;
  fullname: string;
  district: string;
  _id: string;
}

interface LeaderBoard {
  amount: number;
  userId: string;
  uniqueId: string;
  autoBidLimit?: number;
  isAutobid: boolean;
  contactNo: number;
  fullname: string;
  isRejected: boolean;
  type: string;
  _id: string;
  district?: string;
}

interface Front {
  name: string;
  url: string;
  condition: string[];
  remarks: string;
}
