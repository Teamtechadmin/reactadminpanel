export type StatusType = "LIVE" | "SCHEDULED" | "VERIFIED";

export const statusColor: any = {
  SCHEDULED: "primary",
  LIVE: "info",
  PENDING: "warning",
  EVALUATED: "success",
  PENDING_EVALUATION: "warning",
  PROCUREMENT: "success",
  OTB: "info",
  RCTRANSFER: "info",
  DEAL_LOST: "error",
  NEGOTIATION: "info",
  UNSOLD: "error",
};

export function getStatusColor(status: StatusType) {
  return statusColor[status as string];
}
