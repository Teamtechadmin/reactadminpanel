export type LeadStatus =
  | "EVOLUTIONCONFIRMED"
  | "NONRESPONSIVE"
  | "RESCHEDULING";

export interface GetLeadParams {
  status?: LeadStatus;
  page: number;
  pageSize: number;
}

export interface LeadObject {
  status: string;
  message: string;
  data: any[];
  count: number;
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}
