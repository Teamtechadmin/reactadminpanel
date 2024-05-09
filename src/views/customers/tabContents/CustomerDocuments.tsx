import React from "react";
import { Card } from "@mui/material";
import CarDocsCard from "@/views/cars/tabContents/CarDocsCard";

interface DataProps {
  data: any;
}

const CustomerDocuments = (props: DataProps) => {
  const { data } = props;
  const documents = [
    {
      type: "Address Proof Back",
      thumbnail: data?.addressProofBack?.url,
      downloadLink: data?.addressProofBack?.url,
    },
    {
      type: "Address Proof Front",
      thumbnail: data?.addressProofFront?.url,
      downloadLink: data?.addressProofFront?.url,
    },
    {
      type: "Cancelled Cheque",
      thumbnail: data?.canceledCheque?.url,
      downloadLink: data?.canceledCheque?.url,
    },
    {
      type: "Pan Card",
      thumbnail: data?.panCard?.url,
      downloadLink: data?.panCard?.url,
    },
    {
      type: "Shop Picture",
      thumbnail: data?.shopPicture?.url,
      downloadLink: data?.shopPicture?.url,
    },
    {
      type: "Visiting Card",
      thumbnail: data?.visitingCard?.url,
      downloadLink: data?.visitingCard?.url,
    },
  ].filter((doc) => doc.thumbnail);

  return (
    <Card>
      <CarDocsCard documents={documents} />
    </Card>
  );
};

export default CustomerDocuments;
