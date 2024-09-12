import { Card } from "@mui/material";
import { DealerCardContent } from "../../cards/content/DealerCardContent";

export const PreferredCars = () => {
  function handleModels() {
    console.log("");
  }
  return (
    <Card>
      <DealerCardContent
        heading="Preferred Car Models"
        subHeading="Here you can add a specific dealers preferred car models"
        btnText="Add Models"
        handleBtnClick={handleModels}
      />
    </Card>
  );
};
