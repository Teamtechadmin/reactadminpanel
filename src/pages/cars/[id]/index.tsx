import TabList from "@/components/ui/tabs/TabList";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { CarTabTypes } from "@/types/cars/car";
import CarDetails from "../../../views/cars/tabContents/CarDetails";
import CarDocuments from "../../../views/cars/tabContents/CarDocuments";
import { useRouter } from "next/router";
import { useGetCar } from "@/services/cars/view/get";
import FallbackSpinner from "@/components/ui/spinner/fallback";
import { CarData } from "@/services/cars/list/types";
import { useGetCarReport } from "@/services/cars/report/get";
import CarExterior from "@/views/cars/tabContents/CarExterior";
import { tabs } from "@/data/cars/tabs";

const CarsView = () => {
  const [value, setValue] = useState(tabs[0].value);
  const router = useRouter();
  const id = router.query.id;
  const { data: car, isLoading, isFetched } = useGetCar(id as string);
  const carData = car?.data?.data?.[0] as CarData;

  const { data: carReports } = useGetCarReport(id as string);
  const carReportsData = carReports?.data.data;

  function handleNext() {
    const currIndex = tabs.findIndex((tab) => tab.value === value);
    if (currIndex === -1 || currIndex === tabs.length - 1) return;
    const nextTabValue = tabs[currIndex + 1].value;
    setValue(nextTabValue);
  }

  const tabComponents = {
    car_details: <CarDetails details={carData} />,
    documents: <CarDocuments />,
    exterior: <CarExterior details={carReportsData} />,
  };

  if (isLoading) {
    return <FallbackSpinner />;
  }

  if (isFetched) {
    const showNext = tabs[tabs.length - 1].value !== value;

    return (
      <>
        <Grid>
          <Grid paddingY={4}>
            <TabList tabOptions={tabs} value={value} setValue={setValue} />
          </Grid>
          <Grid mt={1}>{tabComponents[value as CarTabTypes]}</Grid>
          <Grid mt={4} display={"flex"} gap={3}>
            {showNext ? (
              <>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained">Approve QC</Button>
                <Button color="error" variant="outlined">
                  Reject QC
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default CarsView;
