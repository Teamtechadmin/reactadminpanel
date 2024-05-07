import { LeaderBoard } from "@/services/result/auction/types";

export interface BillForm {
  totalAmount?: number;
  serviceRate?: number;
  gstRate?: number;
}

export type BillHandleType = "view" | "give";

export interface OtbLogProps {
  model: string;
  winner: string;
  leaderBoard?: LeaderBoard[];
  id: string;
}

export interface OtbLeaderBoardRow {
  amount: number;
  userId: string;
  isAutobid: boolean;
  autoBidLimit: number;
  _id: string;
  isRejected: boolean;
  id: string;
}
