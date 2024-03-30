export type QCStatusType = "PENDING" | "REJECTED" | "VERIFIED";

export const qcStatus = {
  PENDING: "warning",
  REJECTED: "error",
  VERIFIED: "success",
};

export function getQCColor(qcStat: QCStatusType) {
  return qcStatus[qcStat];
}
