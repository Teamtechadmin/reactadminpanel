import { IconButton, Tooltip } from "@mui/material";
import IconifyIcon from "../icon";

interface ButtonIconProps {
  title: string;
  icon: string;
  fontSize?: string | number;
  isLink?: boolean;
  size?: "small";
  onClick?: () => void;
  color?: string;
}

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size, onClick, title, icon, fontSize, color } = props;

  return (
    <Tooltip title={title}>
      <IconButton
        size={size ?? "small"}
        onClick={onClick && onClick}
        sx={{ color: "text.secondary" }}
      >
        <IconifyIcon
          icon={icon}
          color={color ?? ""}
          fontSize={fontSize ?? "1.5rem"}
        />
      </IconButton>
    </Tooltip>
  );
};
