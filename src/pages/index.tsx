import { useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/spinner/fallback";
import { verifyUser } from "@/functions/auth/verify-user";
import { useAuthStore } from "@/store/auth/store";
import { RoleType } from "@/types/auth/role";

export const getHomeRoute = (role: RoleType) => {
  if (role === "SUPERADMIN") return "/home";
  else return "/login";
};

const Home = () => {
  const { auth } = useAuthStore();
  const router = useRouter();
  const isVerifiedUser = verifyUser(auth.user.role);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isVerifiedUser) {
      const homeRoute = getHomeRoute(auth.user.role);

      // Redirect user to Home URL
      router.replace(homeRoute);
    } else {
      const redirectionLink = "/";
      router.replace(redirectionLink);
    }
  }, []);

  return <Spinner />;
};

export default Home;
