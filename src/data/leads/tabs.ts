import { LeadStatus } from "@/services/leads/list/types";

interface LeadTabs {
  label: string;
  value: LeadStatus;
}

export const tabs: LeadTabs[] = [
  {
    label: "All Leads",
    value:
      "NOTCONTACTED,EVOLUTIONCONFIRMED,EVOLUTIONSCHEDULED,EVOLUTIONCOMPLETED,RESCHEDULING,NONRESPONSIVE,EVOLUTIONEXPIRED",
  },
  {
    label: "Not Contacted",
    value: "NOTCONTACTED",
  },
  {
    label: "Evaluation Confirmed",
    value: "EVOLUTIONCONFIRMED",
  },
  {
    label: "Evaluation Scheduled",
    value: "EVOLUTIONSCHEDULED",
  },
  {
    label: "Evaluation Completed",
    value: "EVOLUTIONCOMPLETED",
  },
  {
    label: "Rescheduling Needed",
    value: "RESCHEDULING",
  },
  {
    label: "Non Responsive",
    value: "NONRESPONSIVE",
  },
];
