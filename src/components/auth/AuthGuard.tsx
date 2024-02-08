// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth/store";
import { verifyUser } from "@/functions/auth/verify-user";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const router = useRouter();
  const { auth } = useAuthStore();
  const isVerifiedUser = verifyUser(auth.user.role);
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (!isVerifiedUser || !auth) {
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, auth],
  );

  if (!isVerifiedUser) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
