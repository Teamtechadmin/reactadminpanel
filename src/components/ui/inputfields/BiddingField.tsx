import { TextField } from "@mui/material";
import { ButtonIcon } from "../buttons/ButtonIcon";
import useCustomToast from "@/utils/toast";
import { SetStateAction } from "react";

interface Props {
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
  currentBid: number;
  stepRate: number;
}

function BiddingField(props: Props) {
  const { setValue, value, currentBid, stepRate } = props;
  const toast = useCustomToast();

  const handleChange = (e: any) => {
    const inputValue = e.target.value.replace(/₹\s?|(,*)/g, ""); // Remove the existing ₹ and commas
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleDecrement = () => {
    if (stepRate + currentBid <= Number(value) - Number(stepRate)) {
      setValue(Number(value) - Number(stepRate));
    } else {
      toast.error(
        "Bid Amount should not be less than sum of current bid and step rate",
      );
    }
  };

  const handleIncrement = () => {
    setValue(Number(value) + Number(stepRate));
  };

  return (
    <TextField
      value={`₹ ${value}`}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <ButtonIcon
            onClick={handleDecrement}
            icon={"tabler:minus"}
            fontSize={25}
          />
        ),
        endAdornment: (
          <ButtonIcon
            onClick={handleIncrement}
            icon={"tabler:plus"}
            fontSize={25}
          />
        ),
      }}
      inputProps={{
        style: {
          textAlign: "center",
          color: "Highlight",
          fontSize: 18,
          fontWeight: 600,
        },
      }}
    />
  );
}

export default BiddingField;
