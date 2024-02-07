// ** React Imports
import { NavSectionTitle } from "@/layouts/types";
import { ReactNode, useContext } from "react";
import { AbilityContext } from "./Can";

// ** Component Imports

// ** Types

interface Props {
  children: ReactNode;
  navTitle?: NavSectionTitle;
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children, navTitle } = props;
  // ** Hook
  const ability = useContext(AbilityContext);

  return ability && ability.can(navTitle?.action, navTitle?.subject) ? (
    <>{children}</>
  ) : null;
};

export default CanViewNavSectionTitle;
