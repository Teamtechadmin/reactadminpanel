import SelectFormField from "@/components/ui/inputfields/SelectField";
import TextFormField from "@/components/ui/inputfields/TextFormField";
import TimePickerForm from "@/components/ui/inputfields/TimePickerForm";
import { kilometers } from "@/data/leads/kilometers";
import { ownership } from "@/data/leads/ownership";
import { purpose } from "@/data/leads/purpose";
import { rto } from "@/data/leads/rto";
import { sources } from "@/data/leads/sources";
import { whenToSell } from "@/data/leads/whenToSell";
import { years } from "@/data/leads/years";
import { useGetBrands } from "@/services/leads/brands/list/get";
import { Result } from "@/services/leads/brands/list/types";
import { useGetModels } from "@/services/leads/models/list/get";
import { useGetVariants } from "@/services/leads/variants/list/get";
import { extractValuesByKey } from "@/utils/extract-values-by-keys";
import { transformStringsToObjects } from "@/utils/transform-string-array-to-objects";
import { Button, Grid, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

interface CarDetailsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (val: any) => void;
}

const renderDisplayMenuItems = (item: { id: string; display_name: string }) => (
  <MenuItem key={item.id} value={item.display_name}>
    {item.display_name}
  </MenuItem>
);

const renderMenuItems = (item: { label: string; value: string }) => (
  <MenuItem value={item.value}>{item.label}</MenuItem>
);

export default function CarDetails(props: CarDetailsProps) {
  const { control, errors, handleSubmit, onSubmit } = props;
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState({});
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  const { data: brandsData } = useGetBrands();
  const brands = brandsData?.data;
  const brandResults = brands?.results;
  const brandOpts = brandResults?.filter((item: Result) => item.is_usable);

  const makeID = brandOpts?.find((item) => item.display_name === make)?.id;
  const { data: modelsData } = useGetModels({
    makeID: Number(makeID),
    year,
  });
  const models = modelsData?.data;
  const modelsResult = models?.results;
  const modelOpts = modelsResult;

  const modelID = modelOpts?.find((item) => item.display_name === model)?.id;
  const { data: variantsData } = useGetVariants({
    modelID: Number(modelID),
    year,
  });
  const variants = variantsData?.data;
  const variantsResult = variants?.results;

  const fuelVarients = extractValuesByKey(variantsResult ?? [], "fuel_type");
  const options = transformStringsToObjects(fuelVarients);

  // Filtering Transmission Opts w.r.t Fuel
  const filteredVarients = variantsResult?.filter(
    (item) => item.fuel_type === fuelType,
  );
  const transmissions = extractValuesByKey(
    filteredVarients ?? [],
    "transmission_type",
  );
  const transmissionOpts = transformStringsToObjects(transmissions);

  // Filtering Variants Opts w.r.t. Fuel and Transmission
  const varientOpts = variantsResult?.filter(
    (varient) =>
      varient.fuel_type === fuelType &&
      varient.transmission_type === transmission,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap={3} paddingY={2}>
        <Grid item lg={3.75}>
          <TimePickerForm
            id="dateAndTime"
            label="Date"
            control={control}
            error={errors.dateAndTime as any}
          />
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="make"
            label="Car Brand"
            size="medium"
            renderMenuItems={renderDisplayMenuItems}
            data={brandOpts ?? []}
            error={errors?.make}
            handleOnChange={(e: SelectChangeEvent) => {
              setMake(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="rto"
            label="RTO Location"
            size="medium"
            renderMenuItems={renderMenuItems}
            data={rto ?? []}
            error={errors?.rto}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="monthAndYearOfManufacture"
            label="Manufacturing Year"
            size="medium"
            renderMenuItems={renderMenuItems}
            data={years ?? []}
            handleOnChange={(e) => setYear(e.target.value)}
            error={errors?.year}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="model"
            label="Car Model"
            size="medium"
            renderMenuItems={renderDisplayMenuItems}
            data={modelOpts ?? []}
            handleOnChange={(e) => setModel(e.target.value)}
            error={errors?.model}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="fuelType"
            label="Fuel Type"
            size="medium"
            renderMenuItems={renderMenuItems}
            data={options ?? []}
            handleOnChange={(e) => setFuelType(e.target.value)}
            error={errors?.fuelType}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="transmission"
            label="Transmission"
            size="medium"
            renderMenuItems={renderMenuItems}
            data={transmissionOpts ?? []}
            handleOnChange={(e) => setTransmission(e.target.value)}
            error={errors?.transmission}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="variant"
            label="Variant"
            size="medium"
            renderMenuItems={renderDisplayMenuItems}
            error={errors?.variant}
            data={varientOpts ?? []}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="ownershipNumber"
            label="Ownership Number"
            size="medium"
            renderMenuItems={renderMenuItems}
            error={errors?.ownershipNumber}
            data={ownership ?? []}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="odometerReading"
            label="Kilometers Driven"
            size="medium"
            renderMenuItems={renderMenuItems}
            error={errors?.odometerReading}
            data={kilometers ?? []}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="sellingPlan"
            label="Planned Selling Time"
            size="medium"
            renderMenuItems={renderMenuItems}
            error={errors?.sellingPlan}
            data={whenToSell ?? []}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <TextFormField
            control={control}
            id="sellerMobileNumber"
            label="Phone Number"
            error={errors?.sellerMobileNumber as any}
            size="medium"
            type="number"
          />
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="source"
            label="Source"
            size="medium"
            renderMenuItems={renderMenuItems}
            data={sources ?? []}
            error={errors?.source}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <SelectFormField
            control={control}
            id="purpose"
            label="Purpose"
            error={errors?.purpose}
            size="medium"
            renderMenuItems={renderMenuItems}
            data={purpose ?? []}
          />{" "}
        </Grid>
        <Grid item lg={3.75}>
          <TextFormField
            id="registrationNumber"
            size="medium"
            control={control}
            error={errors?.registrationNumber as any}
            label="Registration No."
          />
        </Grid>
      </Grid>
      <Grid display={"flex"} justifyContent={"end"} gap={2}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
