export type LeadStatus =
  | "NOTCONTACTED"
  | "EVOLUTIONCONFIRMED"
  | "EVOLUTIONSCHEDULED"
  | "EVOLUTIONCOMPLETED"
  | "RESCHEDULING"
  | "NONRESPONSIVE"
  | "EVOLUTIONEXPIRED"
  | "NOTCONTACTED,EVOLUTIONCONFIRMED,EVOLUTIONSCHEDULED,EVOLUTIONCOMPLETED,RESCHEDULING,NONRESPONSIVE,EVOLUTIONEXPIRED";

export interface GetLeadParams {
  status?: LeadStatus;
  page: number;
  pageSize: number;
}

export interface LeadObject {
  status: string;
  message: string;
  data: Lead[];
  count: number;
  meta: Meta;
}

interface Meta {
  access: string;
  refresh: string;
}

export interface Lead {
  id: string;
  _id: string;
  leadId: string;
  sellerMobileNumber: number;
  proposeOfInspection: string;
  monthAndYearOfManufacture: string;
  city: string;
  pinCode: null | number;
  dateAndTime: Date;
  source: string;
  leadStatus: LeadStatus;
  make: string;
  model: string;
  variant: string;
  fuelType: string;
  ownershipNumber: string;
  odometerReading: string;
  transmission: string;
  rto: string;
  registrationNumber: string;
  sellingPlan: string;
  year: string;
  subStatus: string[];
}
