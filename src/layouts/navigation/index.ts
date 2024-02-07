import { VerticalNavItemsType } from "../types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Customers",
      path: "/home",
      action: "manage",
      subject: "home",
    },
    {
      title: "Cars",
      path: "/cars",
      action: "manage",
      subject: "home",
    },
  ];
};

export default navigation;
