// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth/store";
import { USER_ROLES } from "@/configs/auth/roles";
import { GUEST_REDIRECTION_LINK } from "@/configs/auth/routes";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const { auth } = useAuthStore();
  const router = useRouter();
  const isVerifiedUser = USER_ROLES.includes(auth.user.role);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isVerifiedUser) {
      router.replace(GUEST_REDIRECTION_LINK);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user.role]);

  if (isVerifiedUser) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
