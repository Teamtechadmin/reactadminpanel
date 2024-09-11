import SelectFormField from "@/components/ui/inputfields/SelectField";
import { renderItem } from "@/components/ui/utility/MenuItem";
import { Grid } from "@mui/material";
import { DealerCustomSearch } from "./DealerCustomSearch";
import { DealerContext, DealerContextType } from "@/pages/dealers";
import { useContext } from "react";

const dealerStatus = [
  {
    id: null,
    name: "Status",
  },
  {
    id: "not_submitted",
    name: "Not Submitted",
  },
  {
    id: "submitted",
    name: "Submitted",
  },
  {
    id: "verified",
    name: "Verified",
  },
  {
    id: "rejected",
    name: "Rejected",
  },
];

export const DealerSearchHeader = () => {
  const propParams = useContext<DealerContextType>(DealerContext);
  const { watch, control, setValue } = propParams as any;
  const [searchBy] = watch(["searchBy"]);
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      paddingY={4}
    >
      <DealerCustomSearch
        control={control}
        searchBy={searchBy}
        setValue={setValue}
      />
      <Grid item xl={2} md={2} xs={4}>
        <SelectFormField
          control={control}
          id="status"
          renderMenuItems={renderItem}
          data={dealerStatus}
          label="Status"
          labelSize="small"
          fillWhite
          size="medium"
        />
      </Grid>
    </Grid>
  );
};
