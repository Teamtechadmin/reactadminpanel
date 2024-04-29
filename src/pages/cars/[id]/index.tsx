import TabList from "@/components/ui/tabs/TabList";
import { Grid } from "@mui/material";
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
import CarEngine from "@/views/cars/tabContents/CarEngine";
import CarInterior from "@/views/cars/tabContents/CarInterior";
import CarOther from "@/views/cars/tabContents/CarOther";
import generateCarPdf from "@/functions/cars/export/generate-pdf";
import { useGetCarDocs } from "@/services/cars/documents/get";
import AuctionDialogue from "@/views/cars/dailogue/AuctionDialogue";
import CarViewBottomActions from "@/views/cars/actions/CarViewBottomActions";
import CarViewTopActions from "@/views/cars/actions/CarViewTopActions";
import useCarActions from "@/hooks/actions/cars/car-actions";
import { readImage } from "@/utils/get-image-as-base64";
import headerLogo from "../../../../public/assets/pdfLogo.png";

const CarsView = () => {
  const [value, setValue] = useState(tabs[0].value);
  const [openApprove, setOpenApprove] = useState(false);
  const router = useRouter();
  const id = String(router.query.id);
  const { data: car, isLoading, isFetched } = useGetCar(id as string);
  const carData = car?.data?.data?.[0] as CarData;
  const { data: carDocsData, isFetched: isDocFetched } = useGetCarDocs(
    id as string,
  );
  const carDocs = carDocsData?.data.data;
  const { data: carReports } = useGetCarReport(id as string);
  const carReportsData = carReports?.data.data;
  const { approveQC, rejectQC } = useCarActions();

  function handleApprove() {
    setOpenApprove(!openApprove);
  }

  const tabComponents = {
    car_details: <CarDetails details={carData} />,
    documents: (
      <CarDocuments
        details={carReportsData}
        carDocs={carDocs}
        isFetched={isDocFetched}
      />
    ),
    exterior: <CarExterior details={carReportsData} />,
    engine: <CarEngine details={carReportsData} />,
    interior: <CarInterior details={carReportsData} />,
    others: <CarOther details={carReportsData} />,
  };

  function handleNext() {
    const currIndex = tabs.findIndex((tab) => tab.value === value);
    if (currIndex === -1 || currIndex === tabs.length - 1) return;
    const nextTabValue = tabs[currIndex + 1].value;
    setValue(nextTabValue);
  }

  function handleDownload() {
    readImage(headerLogo.src, function (headerLogo: string | undefined) {
      generateCarPdf("download", carReportsData, carData, carDocs, headerLogo);
    });
  }

  function handleOpen() {
    readImage(headerLogo.src, function (headerLogo: string | undefined) {
      generateCarPdf("print", carReportsData, carData, carDocs, headerLogo);
    });
  }

  if (isLoading) {
    return <FallbackSpinner />;
  }

  if (isFetched) {
    const showNext = tabs[tabs.length - 1].value !== value;
    const isPending = carData?.status === "PENDING_EVALUATION";
    const isVerified = carData?.qcStatus === "VERIFIED";

    return (
      <>
        <Grid>
          <Grid paddingY={4} display={"flex"} justifyContent={"space-between"}>
            <TabList tabOptions={tabs} value={value} setValue={setValue} />
            <CarViewTopActions
              isPending={isPending}
              handleDownload={handleDownload}
              handleOpen={handleOpen}
            />
          </Grid>
          <Grid mt={1}>{tabComponents[value as CarTabTypes]}</Grid>
          <CarViewBottomActions
            handleApprove={handleApprove}
            handleNext={handleNext}
            handleApproveQC={() => approveQC(id)}
            handleRejectQC={() => rejectQC(id)}
            isVerified={isVerified}
            showNext={showNext}
          />
        </Grid>
        <AuctionDialogue
          open={openApprove}
          setOpen={setOpenApprove}
          id={String(router.query.id)}
          modal="auction"
        />
      </>
    );
  }
};

export default CarsView;
