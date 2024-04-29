import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

interface ConfirmBodyProps {
  handleSubmit: () => void;
  handleClose: () => void;
  text: string;
}

export const ConfirmBody = (props: ConfirmBodyProps) => {
  const { handleSubmit, handleClose, text } = props;
  return (
    <>
      <DialogContent>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};
