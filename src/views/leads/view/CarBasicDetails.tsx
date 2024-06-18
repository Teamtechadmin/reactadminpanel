import { Lead } from "@/services/leads/list/types";
import { useLeadStore } from "@/store/leads/store";
import { capitaliseFirstLetter } from "@/utils/capitalise-firstletter";
import { formatDateAndTime } from "@/utils/format-date-and-time";
import { Grid, Typography } from "@mui/material";
import React from "react";

function getDatas(lead: Lead) {
  return [
    {
      label: "Date",
      value: formatDateAndTime(new Date(lead.dateAndTime)),
    },
    {
      label: "Car Brand",
      value: lead?.make,
    },
    {
      label: "RTO Location",
      value: capitaliseFirstLetter(lead?.rto ?? ""),
    },
    {
      label: "Manufacturing Year",
      value: lead?.monthAndYearOfManufacture,
    },
    {
      label: "Car Model",
      value: lead?.model,
    },
    {
      label: "Fuel Type",
      value: lead?.fuelType,
    },
    {
      label: "Transmission",
      value: lead?.transmission,
    },
    {
      label: "Variant",
      value: lead?.variant,
    },
    {
      label: "Ownership Number",
      value: lead?.ownershipNumber,
    },
    {
      label: "Kilometers Driven",
      value: (lead?.odometerReading ?? "0") + "Km",
    },
    {
      label: "Planned Selling Time",
      value: lead?.sellingPlan,
    },
    {
      label: "Mobile Number",
      value: lead?.sellerMobileNumber,
    },
    {
      label: "Source",
      value: lead?.source,
    },
    {
      label: "Reg No.",
      value: lead?.registrationNumber,
    },
  ];
}

export default function CarBasicDetails() {
  const { lead } = useLeadStore();
  if (lead) {
    const datas = getDatas(lead);
    return (
      <Grid container padding={3} display={"flex"}>
        {datas?.map((data) => {
          return (
            <Grid key={data?.label} item lg={4} paddingY={1}>
              <Typography fontWeight={600}>{data?.label ?? ""}</Typography>
              <Typography>{data?.value ?? "-"}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return <Grid display={"flex"} textAlign={"center"}></Grid>;
  }
}
