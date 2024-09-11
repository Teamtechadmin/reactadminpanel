import { deposit } from "@/data/dealers/security_deposit";
import { districts } from "@/data/leads/districts";

export const getDealerSearch = (searchBy: null | string) => {
  switch (searchBy) {
    case "location":
      return {
        type: "drop_down",
        label: "Location",
        data: districts,
      };
    case "security_deposit":
      return {
        type: "drop_down",
        label: "Security Deposit",
        data: deposit,
      };
    case "name":
      return {
        type: "text",
        label: "Name",
      };
    case "contactNo":
      return {
        type: "text",
        label: "Contact Number",
      };
    default:
      return {
        type: "hide",
      };
  }
};
