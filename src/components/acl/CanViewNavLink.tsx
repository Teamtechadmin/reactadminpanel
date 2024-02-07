// ** React Imports
import { ReactNode } from "react";

// ** Types
import { NavLink } from "../../layouts/types";
import { useAuthStore } from "@/store/store";
import { defineAbilitiesFor } from "@/configs/acl/acl";
import { AnyAbility } from "@casl/ability";

interface Props {
  navLink?: NavLink;
  children: ReactNode;
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children, navLink } = props;

  // ** Hook
  const { auth } = useAuthStore();
  const ability: AnyAbility = defineAbilitiesFor(auth.user.role);

  return ability && ability.can(navLink?.action, navLink?.subject) ? (
    <>{children}</>
  ) : null;
};

export default CanViewNavLink;
