import { Button, Grid } from "@mui/material";

interface CarViewBottomProps {
  showNext: boolean;
  handleNext: () => void;
}

const CarViewBottomActions = (props: CarViewBottomProps) => {
  const { handleNext, showNext } = props;
  return (
    <Grid mt={4} display={"flex"} gap={3}>
      {showNext ? (
        <>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default CarViewBottomActions;
