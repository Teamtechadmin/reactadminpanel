export type StatusType = "LIVE" | "SCHEDULED" | "VERIFIED";

export const statusColor: any = {
  SCHEDULED: "default",
  LIVE: "info",
  PENDING: "warning",
  EVALUATED: "success",
  PENDING_EVALUATION: "warning",
};

export function getStatusColor(status: StatusType) {
  return statusColor[status as string];
}
