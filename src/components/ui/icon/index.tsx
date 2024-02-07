// ** Icon Imports
import { Icon, IconProps } from "@iconify/react";

const IconifyIcon = ({ icon, fontSize, ...rest }: IconProps) => {
  return <Icon icon={icon} fontSize={fontSize ?? "1.375rem"} {...rest} />;
};

export default IconifyIcon;
