import { Card } from "@mui/material";
import { DealerCardContent } from "../../cards/content/DealerCardContent";
import { SecurityDepositPayment } from "./SecurityDepositPayment";

export const SecurityDeposit = () => {
  function handleSecurity() {
    console.log("security");
  }
  return (
    <Card>
      <DealerCardContent
        heading="Security Deposit"
        subHeading="If the payments are not done by dealers,You
can manually verify them from here"
        btnText="Verify Dealer"
        handleBtnClick={handleSecurity}
      />
      <SecurityDepositPayment />
    </Card>
  );
};
