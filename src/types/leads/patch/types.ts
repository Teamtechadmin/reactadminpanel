export interface LeadUpdate {
  initialCallDate: string;
  expectedPrice: string;
  floodAffected: string;
  owner: string;
  sellerName: string;
  district: string;
  pinCode: string;
  locationLink: string;
  address: string;
  landMark: string;
  sellingReason: string;
  teleCallerId: string;
  status: string;
  initialFollowUpNotes: string;
  relation: string;
  city: string;
  subStatus: string[];
  leadStatus: string;
  followUpNotes: string;
  followUpCallDate: string;
  finalFollowUpNotes: string;
  finalCallDate: string;
  followUps: [
    {
      status: string;
      date: string;
      notes: string;
    },
  ];
}
