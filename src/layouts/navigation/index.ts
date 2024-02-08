import { VerticalNavItemsType } from "../types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboard",
      path: "/home",
      action: "manage",
      subject: "home",
    },
    {
      title: "Customers",
      path: "/customers",
      action: "manage",
      subject: "customers",
    },
    {
      title: "Auctions",
      path: "/auctions",
      action: "manage",
      subject: "auctions",
    },
    {
      title: "Results",
      path: "/results",
      action: "manage",
      subject: "results",
    },
    {
      title: "OTB",
      path: "/otb",
      action: "manage",
      subject: "otb",
    },
    {
      title: "Evaluators",
      path: "/evaluators",
      action: "manage",
      subject: "evaluators",
    },
  ];
};

export default navigation;
