import React from "react";
import CustomerDetails from "./CustomerDetails";
import CustomerDocuments from "./CustomerDocuments";
import { CustomerTabTypes } from "../../../types/customers/tabType";
import { Dealer } from "@/types/customers/get";

interface CustomerTabsProps {
  value: string;
  data: Dealer;
}

const CustomerTabs = (props: CustomerTabsProps) => {
  const { value, data } = props;
  const CustomerTabs = {
    dealer_details: <CustomerDetails data={data} />,
    documents: <CustomerDocuments data={data} />,
  };

  return CustomerTabs[value as CustomerTabTypes] as React.JSX.Element;
};

export default CustomerTabs;
