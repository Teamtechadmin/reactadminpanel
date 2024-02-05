// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/store";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const router = useRouter();
  const { auth } = useAuthStore();

  console.log(auth, "usercheck");

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (auth.user) {
        if (router.asPath !== "/") {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route],
  );

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
