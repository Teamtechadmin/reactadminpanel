import { LeaderBoard } from "@/services/result/auction/types";

export function getWinner(leaderBoard: LeaderBoard[], winner: string) {
  return leaderBoard && leaderBoard.find((item) => item.userId === winner);
}
